### ts 实现的简单的依赖注入

```typescript
import "reflect-metadata";
import { parseScript } from "esprima";
interface IIdexService {
  log(str: string): void;
}

class IndexService implements IIdexService {
  log(str: string) {
    console.log(str);
  }
}

interface IType {
  [key: string]: Symbol;
}

const Types: IType = {
  indexServer: Symbol.for("indexServer"),
  indexServer2: Symbol.for("indexServer2"),
};

function hasKey<O extends Object>(obj: O, key: keyof any): key is keyof O {
  return obj.hasOwnProperty(key);
}

function inject(servece: Symbol) {
  return (target: Object, targetKey: string, index: number) => {
    if (!targetKey) {
      // target 此时是类的构造函
      // target.indexServer = new IndexService();
      Reflect.defineMetadata(servece, new IndexService(), target);
    }
    /**
     *  */
  };
}

function getParams(fn: Function) {
  let ast = parseScript(fn.toString());
  let funParams: any[] = [];
  let node = ast.body[0];
  if (node.type === "FunctionDeclaration") {
    funParams = node.params;
  }
  let validParam: string[] = [];
  funParams.forEach((obj) => {
    if (obj.type === "Identifier") {
      validParam.push(obj.name);
    }
  });
  return validParam;
}

function controller<T extends { new (...args: any[]): {} }>(controller: T) {
  class Controller extends controller {
    constructor(...args: any[]) {
      super(...args);
      const injectParams = getParams(controller);
      let identify: string;
      for (identify of injectParams) {
        if (hasKey(this, identify)) {
          this[identify] = Reflect.getOwnMetadata(Types[identify], controller);
        }
      }
    }
  }
  return Controller;
}

@controller
class IndexController {
  private indexServer: IIdexService;
  constructor(@inject(Types.indexServer) indexServer: any) {
    this.indexServer = indexServer;
  }
  info() {
    this.indexServer.log("这是注入后的结果");
  }
}

const index = new IndexController(null);
index.info();
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "lib": ["ES2015", "DOM"],
    "experimentalDecorators": true
  }
}
```
