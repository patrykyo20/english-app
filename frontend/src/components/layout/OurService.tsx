import Card from "../ui/Card";

const OurService = () => {
  return (
    <section className="service" id="OurService">
      <p className="typography__headline typography--center service__headline">OUR SERVICE</p>
      <h2
        className="typography__title typography__title--primary typography--center service__title"
      >
        Check out our English <br />
        language courses
      </h2>

      <div className="container service__container service__cards">
        <Card
          variant="quiz"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo at veritatis dolor, dolore perspiciatis consequuntur distinctio tempora repellendus"
        />
        <Card
          variant="sentences"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo at veritatis dolor, dolore perspiciatis consequuntur distinctio tempora repellendus"
        />
        <Card 
          variant="grammar"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo at veritatis dolor, dolore perspiciatis consequuntur distinctio tempora repellendus"
        />
      </div>
    </section>
  );
};

export default OurService;