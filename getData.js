class ErrorResponse extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}


function getData(url){

  let xhrPromise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4 && xhr.status === 200){
        let resJson = xhr.response
        let res = JSON.parse(resJson)
        resolve(res)
      }else if(xhr.readyState === 4){
        let err = new ErrorResponse(xhr.status, xhr.statusText)
        reject(err);
      }
    }
  
    xhr.open('get', url)
  
    xhr.send()
  })

  return xhrPromise
}