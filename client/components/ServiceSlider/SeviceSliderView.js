import React,{Component} from 'react';

export default class ServiceSliderView extends Component{
    constructor(props){
        super(props);

    }

    render(){
        //проверяем наличие изображений в услуге, если их нет - генерим пустой контейнер
        if(this.props.service.images.length<1){
            return(<div></div>);
        }

        //генерируемые запчасти слайдера-карусели        
        let sliderIndicators=this.props.service.images.map((item,i)=>
            <li key={"ind"+item.imageId} data-target={"#carouselService"+this.props.service._id} data-slide-to={i} className={i===0?'active':''}></li>
        );

        let sliderImages=this.props.service.images.map((item,i)=>
            <div key={"img"+item.imageId} className={i===0?'carousel-item active':'carousel-item'}>
                <img className="d-block w-100 img-thumbnail" src={item.imageURL} alt={item.imageURL}/>
            </div>
        );

        return(
                <div id={"carouselService"+this.props.service._id} className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        {sliderIndicators}
                    </ol>

                    <div className="carousel-inner">
                        {sliderImages}
                    </div>

                    <a className="carousel-control-prev" href={"#carouselService"+this.props.service._id} role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href={"#carouselService"+this.props.service._id} role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
        );
    }
}