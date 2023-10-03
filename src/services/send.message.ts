export const SendMessage = async(urls:string[],message:string,cliente:string,telefono:string) =>{

    try{


        const promises:any[] = [];

        urls.forEach((url:string, index:number)=>{
            
            promises[index] = fetch(url,{
                method: 'POST',
                cache: 'no-store',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cliente,
                    telefono,
                    message
                })
            })           
        
        });

        const response = await Promise.all(promises);
        return await Promise.all(response.map(res=>res.json()))
    
        
    
    } catch (error) {  
        
        throw error;
    }
    
}


