import Header from "../components/Header";
import Footer from "../components/Footer";
import Welcome from "../components/Welcome";
import AboutMe from "../components/AboutMe";
import UniversityAndDance from "../components/UniversityAndDance";
import China from "../components/China";
import Moscow from "../components/Moscow";
import Resume from "../components/Resume";
import Frontend from "../components/Frontend";
import Comments from "../components/Comments";

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <div id="home">
          <Welcome />
        </div>
        <div id="about">
          <AboutMe />
        </div>
        <div id="study">
          <UniversityAndDance />
        </div>
        <div id="china">
          <China />
        </div>
        <div id="moscow">
          <Moscow />
        </div>
        <div id="resume">
          <Resume />
        </div>
        <div id="frontend">
          <Frontend />
        </div>
        <div id="contact">
          <Comments />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
