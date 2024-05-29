import { FaUserTie, FaUserShield, FaUsers, FaUserCog, FaUserCheck, FaUserTag, FaUserFriends, FaUserSecret, FaUserGraduate, FaUser } from 'react-icons/fa';

const frameworkData = [
  {
    level: "Chief Officer (e.g., CEO, COO, CFO)",
    description: "Oversees the overall strategy and performance of the entire organization, interfaces with the Board, and is accountable for all operational outcomes.",
    icon: FaUserTie
  },
  {
    level: "Executive Vice President",
    description: "Serves on the executive team with responsibility for critical organizational sectors or functions, overseeing multiple SVPs and VPs, and influencing company-wide strategies.",
    icon: FaUserShield
  },
  {
    level: "Senior Vice President",
    description: "Manages large organizational areas or multiple departments with strategic and operational autonomy, affecting major portions of the organization.",
    icon: FaUsers
  },
  {
    level: "Senior Director / Vice President",
    description: "Leads multiple departments or significant projects with a mix of strategic planning and operational management, typically with Directors and Managers as direct reports.",
    icon: FaUserCog
  },
  {
    level: "Director",
    description: "Manages several teams or departments, sets strategic objectives, and aligns them with organizational goals, usually overseeing Managers and Senior Managers.",
    icon: FaUserCheck
  },
  {
    level: "Senior Manager / Associate Director",
    description: "Manages significant projects or key functions within specific areas, focusing on operational leadership and efficiency, overseeing several teams or Managers.",
    icon: FaUserTag
  },
  {
    level: "Manager",
    description: "Directly manages a team's daily operations, including performance and development, typically overseeing Supervisors or Individual Contributors.",
    icon: FaUserFriends
  },
  {
    level: "Supervisor",
    description: "Oversees individual contributors within a specific team, managing daily activities and ensuring process adherence, usually supervising several people.",
    icon: FaUserSecret
  },
  {
    level: "Team Lead",
    description: "Coordinates daily tasks and short-term projects for a small group of Individual Contributors, acting as an intermediate leader without formal supervisory authority.",
    icon: FaUserGraduate
  },
  {
    level: "Individual Contributor",
    description: "Specializes in specific tasks within a team, contributing through personal expertise without supervisory responsibilities, under the direction of a Supervisor or Manager.",
    icon: FaUser
  }
];

const Framework = () => {
  return (
    <section id="framework" className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-slate-950">Our Assessment Framework</h2>
        <p className="mb-6 text-gray-700">Our tool is based on a detailed framework that evaluates key managerial and leadership capabilities across various roles.</p>
        <div className="flex flex-wrap justify-center">
          {frameworkData.map((item, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 flex">
              <div className="border rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between">
                <div>
                  <item.icon className="text-slate-950 text-3xl mb-4 mx-auto" />
                  <h3 className="text-lg font-bold mb-2 text-slate-950">{item.level}</h3>
                  <p className="text-gray-700 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Framework;
