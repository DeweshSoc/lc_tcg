exports.getRandomArray=(req,res,next)=>{
    const n =  Math.floor(Math.random() * (1001 - 0) + 0);
    let h = '[';
    for(let i=0;i<n;i++){
        let rand = Math.floor(Math.random() * (1001 - 0) +0);
        rand=(Math.random()>0.5)?-rand:rand;
        h+=(i<n-1)?rand+',':rand+']';
    }
    const payload = {
        count:1,
        size:n,
        array:h,
        status:'ok',
        message:'none'
    }
    res.status(200).json(payload);
}