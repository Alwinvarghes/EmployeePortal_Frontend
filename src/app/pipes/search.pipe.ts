import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  //transform function will convert the input data a new formate/data
  //first arguments - data to be transformed
  //second argument  - based on which this transformation  has to done.
transform(allEmployee:any[],searchKey:string): any[] {
  const result:any = []

  if(!allEmployee || searchKey == ""){
    return allEmployee
  }
  allEmployee.forEach((item:any)=>{
    if(item.username.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
      result.push(item)
    }
  })
  return result
    
  }

}
