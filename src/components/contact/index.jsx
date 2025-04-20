import { Element } from 'react-scroll';
import style from './index.module.css';

export default function ContactSec() {
    return (
        <Element name='contact' id='contact' >

            <div>
                <div id={style.ServicesSec} className=' w-100 ' >

                    <div id={style.title} className=' container'>
                        <h4 data-aos="fade-down">Contact</h4>
                        <h2>Contact</h2>
                    </div>


                    <div className=' container d-flex flex-column align-items-center justify-content-center'>

                        <div id={style.contactForm} className=' d-flex flex-column align-items-center justify-content-center'>
                            <h4 className=' w-100 w-lg-50 text-center'>Always available for freelance work if the right project comes along, Feel free to contact me!</h4>
                            <form action="" className=' p-3 w-100 d-flex flex-column gap-3'>
                                <div className=' d-flex flex-column flex-md-row gap-3'>
                                    <input  type="text" placeholder="Name *" />
                                    <input  type="email" placeholder="Email *" />
                                </div>
                                <input className={style.formIn} type="text" placeholder="Subject *" />
                                <textarea className={style.formIn} name="message" id="feedback" placeholder="Message *"></textarea>
                                <button className={style.message} type="submit">send message</button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </Element>
    )
}
