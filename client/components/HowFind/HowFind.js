import React,{Component} from 'react';
import Header from '../Header/Header';
import Feedback from '../Feedback/Feedback';

export default class HowFind extends Component{

    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount(){
        $('#carouselHowFind').on('slide.bs.carousel', function (event) {
            let index = event.to;
            $('[listindex]').removeClass('activeList');
            let element = $('[listindex=\''+index+'\']');
            element.addClass('activeList');
        });
    }

    render(){
        
        //слайдер с маршрутом к кабинету(изображение-статика и номер из списка)
        const HowFindSlider=(
            <div className='container howFindSlider'>
                <div id="carouselHowFind" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselHowFind" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselHowFind" data-slide-to="1"></li>
                        <li data-target="#carouselHowFind" data-slide-to="2"></li>
                        <li data-target="#carouselHowFind" data-slide-to="3"></li>
                        <li data-target="#carouselHowFind" data-slide-to="4"></li>
                        <li data-target="#carouselHowFind" data-slide-to="5"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100 img-thumbnail" src="images/howFind/1.jpg" alt="First slide"/>
                            <div className="carousel-caption">
                                <h5>1</h5>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img className="d-block w-100 img-thumbnail" src="images/howFind/2.jpg" alt="Second slide"/>
                            <div className="carousel-caption">
                                <h5>2</h5>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100 img-thumbnail" src="images/howFind/3.jpg" alt="Third slide"/>
                            <div className="carousel-caption">
                                <h5>3</h5>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100 img-thumbnail" src="images/howFind/4.jpg" alt="Third slide"/>
                            <div className="carousel-caption">
                                <h5>4</h5>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100 img-thumbnail" src="images/howFind/5.jpg" alt="Third slide"/>
                            <div className="carousel-caption">
                                <h5>5</h5>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100 img-thumbnail" src="images/howFind/6.jpg" alt="Third slide"/>
                            <div className="carousel-caption">
                                <h5>6</h5>
                            </div>
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#carouselHowFind" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselHowFind" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );

        return(
            <div>
                <Header title='Контактные данные'/>
                <div className="row howFind align-items-center">
                    <div className="col-md leftColumn order-2 order-md-1">
                        <h3 className="text-center">Карта</h3>
                        <iframe className="map container" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d617.8756496570358!2d36.16921987237366!3d51.72384198027599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x412f030b8c4c9713%3A0xd868f614db43e846!2z0YPQuy4g0J_QsNCy0LvRg9C90L7QstGB0LrQvtCz0L4sIDMsINCa0YPRgNGB0LosINCa0YPRgNGB0LrQsNGPINC-0LHQuy4sIDMwNTAxNg!5e0!3m2!1sru!2sru!4v1552462750778"></iframe>
                    </div>
                    <div className="col-md text-center order-1 order-md-2">
                        <h3>Прием осуществляется по адресу: </h3>
                        <span>г. Курск ул. Павлуновского д.3 офис 307</span>
                        <Feedback/>
                    </div>
                </div>
                <div className="row howFind align-items-center">
                <div className="col-md leftColumn order-2 order-md-1">
                    <h3 className="text-center">Как найти кабинет</h3>
                    {HowFindSlider}
                </div>
                <div className="col-md order-1 order-md-2">
                    <h3 className="text-center stepList">Маршрут</h3>
                    <ol>
                        <li listindex='0' className='activeList'>Красное кирпичное здание рядом с аркой</li>
                        <li listindex='1'>Войти можно через аптеку "Биволи"</li>
                        <li listindex='2'>Необходимо пройти в поликлинику</li>
                        <li listindex='3'>Пройдя по коридору можно увидеть лестницу</li>
                        <li listindex='4'>По лестнице необходимо подняться на 3 этаж</li>
                        <li listindex='5'>Недалеко от выхода с лестницы (слева по коридору) находится кабинет 307</li>
                    </ol>
                </div>
            </div>
        </div>
        );
    }

}