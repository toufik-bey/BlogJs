import React from 'react'; 
import { Link } from 'react-router-dom';





const Landing = ()=>{

    return(
        <section className='landing'>
             <div className='dark-overlay'>
                 <div className='landing-inner'>
                    <h1 className='x-large'>Devlopper connector</h1>
                    <p className='lead'>
                        create a Devlopper profile and porfolio, share post and get help from other devloppers
                    </p>
                    <div className='button'>
                        <Link  to='/register' className='btn btn-primary'>Sing up </Link>
                        <Link  to='/login' className='btn btn-light'>Log in </Link>
                    </div>
                 </div>
            </div>
        </section>
    )
}

export default Landing; 