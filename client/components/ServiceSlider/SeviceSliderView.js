import React,{Component} from 'react';

export default class ServiceSliderView extends Component{
    constructor(props){
        super(props);

    }

    render(){
        //проверяем наличие изображений в услуге, если их нет - сообщаем об этом
        if(this.props.service.images.length<1){
            return(<div>Изображения отсутствуют</div>);
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
                // <div id="carouselHowFind" className="carousel slide" data-ride="carousel">
                //     <ol className="carousel-indicators">
                //         <li data-target="#carouselHowFind" data-slide-to="0" className="active"></li>
                //         <li data-target="#carouselHowFind" data-slide-to="1"></li>
                //         <li data-target="#carouselHowFind" data-slide-to="2"></li>
                //         <li data-target="#carouselHowFind" data-slide-to="3"></li>
                //         <li data-target="#carouselHowFind" data-slide-to="4"></li>
                //         <li data-target="#carouselHowFind" data-slide-to="5"></li>
                //     </ol>

                //     <div className="carousel-inner">
                //         <div className="carousel-item active">
                //             <img className="d-block w-100 img-thumbnail" src="images/howFind/1.jpg" alt="First slide"/>
                //             <div className="carousel-caption">
                //                 <h5>1</h5>
                //             </div>
                //         </div>

                //         <div className="carousel-item">
                //             <img className="d-block w-100 img-thumbnail" src="images/howFind/2.jpg" alt="Second slide"/>
                //             <div className="carousel-caption">
                //                 <h5>2</h5>
                //             </div>
                //         </div>
                //         <div className="carousel-item">
                //             <img className="d-block w-100 img-thumbnail" src="images/howFind/3.jpg" alt="Third slide"/>
                //             <div className="carousel-caption">
                //                 <h5>3</h5>
                //             </div>
                //         </div>
                //         <div className="carousel-item">
                //             <img className="d-block w-100 img-thumbnail" src="images/howFind/4.jpg" alt="Third slide"/>
                //             <div className="carousel-caption">
                //                 <h5>4</h5>
                //             </div>
                //         </div>
                //         <div className="carousel-item">
                //             <img className="d-block w-100 img-thumbnail" src="images/howFind/5.jpg" alt="Third slide"/>
                //             <div className="carousel-caption">
                //                 <h5>5</h5>
                //             </div>
                //         </div>
                //         <div className="carousel-item">
                //             <img className="d-block w-100 img-thumbnail" src="images/howFind/6.jpg" alt="Third slide"/>
                //             <div className="carousel-caption">
                //                 <h5>6</h5>
                //             </div>
                //         </div>
                //     </div>

                //     <a className="carousel-control-prev" href="#carouselHowFind" role="button" data-slide="prev">
                //         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                //         <span className="sr-only">Previous</span>
                //     </a>
                //     <a className="carousel-control-next" href="#carouselHowFind" role="button" data-slide="next">
                //         <span className="carousel-control-next-icon" aria-hidden="true"></span>
                //         <span className="sr-only">Next</span>
                //     </a>
                // </div>
        );
    }
}