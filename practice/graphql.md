# graphql简单使用

## 服务端

### server.js

```javascript
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
let schema = require('./schema');
const cors = require('cors');
const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
  })
);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(4000, () => {
  console.log('port 4000');
});

```

### schema.js

```javascript
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
} = graphql;

const { CateGoryModel, ProcuctModel } = require('./module');

// 产品类型

const Category = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    products: {
      type: new GraphQLList(Product),
      resolve(parent) {
        return ProcuctModel.find({ category: parent.id });
      },
    },
  }),
});

const Product = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    category: {
      type: Category,
      resolve(parent) {
        return CateGoryModel.findById(parent.category);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootCategory',
  fields: {
    getCategory: {
      type: Category,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return CateGoryModel.findById(args.id);
      },
    },
    getCateAllgories: {
      type: new GraphQLList(Category),
      args: {},
      resolve(parent, args) {
        return CateGoryModel.find();
      },
    },
    getProduct: {
      type: Product,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return ProcuctModel.find(args.id);
      },
    },
    getProducts: {
      type: new GraphQLList(Product),
      args: {},
      resolve(parent, args) {
        return ProcuctModel.find();
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addCategory: {
      type: Category,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return CateGoryModel.create(args);
      },
    },
  },
});

// 定义schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

```



### module.js

```javascript
let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const conn = mongoose.createConnection('mongodb://localhost/graphql:27017');

conn.on('open', () => console.log('数据库链接成功'));
conn.on('error', (error) => console.log(error));
const CateGorySchema = new Schema({
  name: String,
});

const CateGoryModel = conn.model('Category', CateGorySchema);

const ProductSchema = new Schema({
  name: String,
  category: {
    type: ObjectId,
    ref: 'Category',
  },
});
const ProcuctModel = conn.model('Product', ProductSchema);

module.exports = {
  CateGoryModel,
  ProcuctModel,
};

```



## 客户端

### index.tsx

```react
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

export const link = createHttpLink({
  uri: 'https://mpjk0plp9.lp.gql.zone/graphql',
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

```



### App.tsx

```react
import React from 'react';
import AddProduct from './AddProduct';
import PruductList from './ProcuctList'
import { useQuery } from '@apollo/client';
import { CATEGORIES_PRUCUETS } from './query';
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
  const { error, loading, data } = useQuery(CATEGORIES_PRUCUETS);
  if (error) {
    return <p>加载失败</p>;
  }
  const { getCategories, getProducts } = data;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-heading">
              <AddProduct categories={getCategories}/>
            </div>
            <div className="panel-body">
              <PruductList products={getProducts}/>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-body"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

```



### addProduct.tsx

```react
import React from 'react';

interface props {
  categories: Array<Category>
}

function AddProduct(Props: props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {}

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="">产品名称</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="">产品分类</label>
        <select name="" id="">
          <option value="">选择分类</option>
        </select>
      </div>
      <div className="form-group">
        <input type="submit" className="btn btn-primary" />
      </div>
    </form>
  );
}

export default AddProduct;

```



### ProductList.tsx

```react
import React from 'react';

interface props {
  products: Array<Product>;
}

function ProductList(Props: props) {
  return (
    <table className="table table-striped">
      <caption className="text-center">产品列表</caption>
      <thead>
        <tr>
          <td>名称</td>
          <td>分类</td>
        </tr>
      </thead>
      <tbody>
        {Props.products.map((item) => {
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.category!.id}</td>
          </tr>;
        })}
      </tbody>
    </table>
  );
}

export default ProductList;

```



### query.ts

```typescript
import { gql } from '@apollo/client';

export const CATEGORIES_PRUCUETS = gql`
  query {
    getCategpries {
      id
      name
      products {
        id
        name
      }
    }
    getProducts {
      id
      name
      category {
        id
        name
        products {
          id
          name
        }
      }
    }
  }
`;

```



### type.d.ts

```typescript
interface Category {
  id?: string;
  name?: string;
}

interface Product {
  id?: string;
  name?: string;
  category: ?Category;
  categoryID?: string;
}

```

