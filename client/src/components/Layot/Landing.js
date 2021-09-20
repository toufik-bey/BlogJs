import React from 'react'; 




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
                        <a href='/login' className='btn btn-primary'>Sing up </a>
                        <a href='/login' className='btn btn-light'>Log in </a>
                    </div>
                 </div>
            </div>
        </section>
    )
}

export default Landing; 