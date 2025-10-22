function sortTheInnerContent(str){
return str.split(' ').map(item=>{
    if(item.length>2){
        let first = item[0]
        let last = item[item.length-1]
        let inner = item.slice(1, -1).split('').sort((a,b)=>b.localeCompare(a)).join('')
        return first + inner + last
    } return item
}).join(' ')
}
console.log(sortTheInnerContent("sort the inner content in descending order"))
console.log(sortTheInnerContent('wait for me'))

