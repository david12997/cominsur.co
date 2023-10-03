export const MakeCotizacion = async(urls:string[],data:string,password:string) =>{

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
                    data,
                    password
                })
            })           
        
        });

        const response = await Promise.all(promises);
        return await Promise.all(response.map(res=>res.json()))
    
        
    
    } catch (error) {  
        
        throw error;
    }
    
}