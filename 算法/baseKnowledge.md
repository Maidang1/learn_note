## 快排

```c++
#include<iostream>
using namespace std;
const int N = 1e6 + 10;
int n;
int q[N];


void quick_sort(int l, int r) {
  if(l >= r) return ;
  int x = q[(l + r) >> 1],i = l - 1, j = r + 1;
  
  while(i < j) {
    do i++; while(q[i] < x);
    do j--; while(q[j] >x );
    if(i < j) {
      int tem = q[i];
      q[i] = q[j];
      q[j] = tem;
    }
  } 
  quick_sort(l, j);
  quick_sort(j + 1, r);
  
}

int main() {
  scanf("%d", &n);
  for(int i = 0; i< n; i++) scanf("%d", &q[i]);
  quick_sort(0, n-1);
  for(int i=0; i< n;i++) printf("%d ", q[i]);
}
```



## 归并

```c++
#include<iostream>
using namespace std;
const int N = 1e6 + 10;
int n;
int q[N], tem[N];

void merge_sort(int l, int r) {
  if(l >= r) return;
  int mid = (l + r) >> 1;
  merge_sort(l, mid);
  merge_sort(mid + 1, r);
  
  int i = l, j = mid + 1, k = 0;
  
  while(i <= mid && j <= r) {
    if(q[i] <= q[j]) tem[k++] = q[i++];
    else tem[k++] = q[j++];
  }
  
  while(i <= mid) tem[k++] = q[i++];
  while(j <= r) tem[k++] = q[j++];
  
  for(int i = l,j = 0; i <= r, i++, j++) {
    q[i] = tem[j];
  }
  
}

int main() {
  scanf("%d", &n);
  for(int i = 0; i< n; i++) scanf("%d", &q[i]);
  merge_sort(0, n-1);
  for(int i=0; i< n;i++) printf("%d ", q[i]);
}

```



