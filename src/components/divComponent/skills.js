import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaPython, FaJava, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiExpress, SiTailwindcss, SiBootstrap, SiMongodb, SiFigma } from 'react-icons/si';

const skills = [
  {
    category: 'Languages',
    icons: [FaHtml5, FaCss3Alt, FaJs, SiTypescript, FaJava, FaPython]
  },
  {
    category: 'Libraries & Frameworks',
    icons: [FaReact, SiNextdotjs, SiExpress, SiTailwindcss, SiBootstrap]
  },
  {
    category: 'Tools',
    icons: [SiMongodb, FaGitAlt, FaGithub, SiFigma, FaDocker]
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function SkillsSection() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12 bg-black text-white">
      <motion.h2 
        className="text-4xl font-bold mb-10 text-cyan-400 uppercase tracking-widest"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Skills & Technologies
      </motion.h2>
      
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((skill, index) => (
          <motion.div key={index} className="flex flex-wrap justify-center gap-8 p-4 bg-gray-900 bg-opacity-50 rounded-xl shadow-lg border border-cyan-400">
            {skill.icons.map((Icon, i) => (
              <motion.div 
                key={i} 
                className="p-6 bg-cyan-500 bg-opacity-10 rounded-lg hover:scale-110 transition-all duration-300 shadow-lg border border-cyan-300"
                variants={itemVariants}
              >
                <Icon className="text-5xl text-cyan-400 drop-shadow-glow" />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
