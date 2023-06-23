import shoeDog from '../resources/shoeDog.png';
const AboutComponent = () => {
    return (<div>
            <div>
                <h1>What is Shoe Dog?</h1>
                <p>Shoe Dog is a website dedicated to gathering running shoes reviews.</p>
                <p>We know runners appreciate real users feedback when choosing the next pair to wear.</p>
                <p>We hope you enjoy our website and find the best information to support your next purchase.</p>
                <p>Yours,</p>
                <p>ShoeDog community</p>
            </div>
            <img src={shoeDog} alt="ShoeDog"/>
        </div>
    );

};
export default AboutComponent;