import React from 'react';
import adamImage from './DSC_0383.jpg';
import Amine from './DSF9246.jpg';
import akram from './akram.jpeg'
import islam from './islam.jpg'
const Team = () => {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900">Notre Équipe</h2>
          <p className="mt-4 text-xl text-gray-600">
            Des experts passionnés par la météorologie et la technologie
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <TeamMember
            name="LADJOUZI ADAM"
            role="Fondateur & CO-CEO"
            image= {adamImage}
          />
          <TeamMember
            name="OTMANI AMINE"
            role="Fondateur & CO-CEO"
            image={Amine}
          />
          <TeamMember
            name="DJABALLAH AKRAM"
            role="Lead AI DEPARTMENT"
            image={akram}
          />
          <TeamMember
            name="LEGHLEGH SOUNDOUS"
            role="Lead Data Scientist"
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
          />
          <TeamMember
            name="BOUADJADJ ISLAM"
            role="Lead Operational Search departement "
            image={islam}
          />
        </div>
      </div>
    </section>
  );
};

const TeamMember = ({ name, role, image }: {
  name: string;
  role: string;
  image: string;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-lg text-center">
    <img
      src={image}
      alt={name}
      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
    />
    <h3 className="text-xl font-semibold text-blue-900 mb-1">{name}</h3>
    <p className="text-blue-600">{role}</p>
  </div>
);
export default Team;