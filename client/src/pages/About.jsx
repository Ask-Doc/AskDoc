import { Link } from "react-router-dom";
import Header from "../components/Header";

const About = () => {
  return (
    <div>
      <Header />
      <main className="prose mx-auto flex max-w-6xl flex-col bg-white px-4 pb-20 pt-16 lg:prose-xl sm:px-6 lg:px-8">
        <section aria-label="About AskDoc">
          <h1>About AskDoc</h1>
          <p>
            Welcome to AskDoc, your trusted companion on your health journey! At
            AskDoc, we understand the importance of quick and reliable health
            information. Our platform is designed to empower users by providing
            instant insights into health symptoms and offering informed
            suggestions based on their medical information.
          </p>
        </section>

        <section aria-label="our mission">
          <h2>Our Mission</h2>
          <h3>Empowering Informed Healthcare Decisions</h3>
          <p>
            Our mission is to revolutionize the way individuals approach
            healthcare. We leverage cutting-edge Artificial Intelligence (AI) to
            guide users through symptom descriptions, offering preliminary
            medical advice instantly. AskDoc aims to eliminate uncertainty and
            promote informed decisions about personal health.
          </p>
        </section>

        <section aria-label="How AskDoc Works">
          <h2>How AskDoc Works</h2>
          <ol>
            <li>
              <h4>User-Friendly Registration:</h4>
              <p>
                Getting started with AskDoc is a breeze. Users can register an
                account, providing essential personal data to kickstart their
                health profile
              </p>
            </li>
            <li>
              <h4>Intuitive Health Conversations:</h4>
              <p>
                Share your symptoms with AskDoc with our AI health chatbot.
                Discuss your concerns, and let our platform analyze the
                information.
              </p>
            </li>
            <li>
              <h4>Rapid Informed Responses:</h4>
              <p>
                Receive a personalized response based on the symptoms
                you&apos;ve shared. AskDoc provides rapid insights, offering
                potential health issues and guiding you on the next steps.
              </p>
            </li>
          </ol>
        </section>

        <section aria-label="Why Choose AskDoc?">
          <h2>Why Choose AskDoc?</h2>
          <ul>
            <li>
              <p>
                <span className="font-bold">Instant Symptom Insights: </span>No
                more waiting for appointments. AskDoc delivers rapid responses,
                helping you understand your symptoms right away.
              </p>
            </li>
            <li>
              <p>
                <span className="font-bold">Informed Suggestions:</span>
                Our platform doesn&apos;t just identify symptoms; it provides
                informed suggestions for possible health issues.
              </p>
            </li>
            <li>
              <p>
                <span className="font-bold">Privacy and Security:</span> Your
                health information is handled with the utmost care. AskDoc
                ensures privacy and security, maintaining a secure database for
                your data.
              </p>
            </li>
          </ul>
        </section>

        <section aria-label="Join AskDoc Today">
          <h2>Join AskDoc Today</h2>
          <p>
            Register today and embark on a journey of health empowerment. Say
            goodbye to uncertainties and hello to a reliable health companion.
            AskDoc simplifies symptom identification, making healthcare
            decisions easier and more accessible. Ready to take charge of your
            health? <Link to="/register">Get Started with AskDoc.</Link>
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
