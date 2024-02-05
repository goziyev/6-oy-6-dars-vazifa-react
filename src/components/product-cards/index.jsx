import style from './index.module.css'

export default function ProductCards({data}) {
  return (
    <div className={style.ProductCardsWrapper}>
         {
            data.length && data.map((el,index) => {
             return (
                <div className={style.ProductCard} key={index}>
                <img width={300} src={`https://picsum.photos/id/${index}/300/200`} alt="" />
                <div className={style.ProductCardTexts}>
                    <h2>Narxi: {el.name} </h2>
                    <h3>Narxi: {el.price} </h3>
                    <p>Izoh: {el.description}</p>
                </div>
            </div>
             )
            })
        } 
        
    

    </div>
  )
}
