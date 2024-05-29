import { FaChartLine, FaLightbulb, FaRobot } from 'react-icons/fa';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-light">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-slate-950">Key Features</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4">
            <div className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
              <FaChartLine className="text-slate-950 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-slate-950">Comprehensive Assessments</h3>
              <p className="text-gray-700">Evaluate managerial roles with precision using our detailed framework.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
              <FaLightbulb className="text-slate-950 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-slate-950">Personalized Development Plans</h3>
              <p className="text-gray-700">Receive tailored recommendations to enhance your leadership skills.</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="border rounded-lg p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
              <FaRobot className="text-slate-950 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2 text-slate-950">AI-Driven Insights</h3>
              <p className="text-gray-700">Utilize advanced AI models to analyze responses and provide actionable advice.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
