import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Aunindya's ability to seamlessly integrate complex deep learning architectures into responsive web applications is truly exceptional. A rare talent.",
    name: "Dr. Sarah Jenkins",
    role: "Lead AI Researcher, TechNova"
  },
  {
    id: 2,
    quote: "Working with Aunindya during the hackathon was an incredible experience. His full-stack engineering skills and problem-solving mindset led our team to victory.",
    name: "Michael Chen",
    role: "Senior Software Engineer"
  },
  {
    id: 3,
    quote: "From designing the YOLOv8 pipeline to deploying it on the edge, Aunindya showed remarkable dedication and technical depth. Highly recommended.",
    name: "Prof. Alan Turing",
    role: "University Department Head"
  }
];

export const Testimonials = () => {
  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-24"
    >
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center">
          What People <span className="text-blue-500">Say</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TESTIMONIALS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass p-8 rounded-2xl flex flex-col relative group"
          >
            <Quote className="w-10 h-10 text-blue-500/20 absolute top-6 right-6 group-hover:text-blue-500/40 transition-colors duration-300" />
            
            <p className="text-stone-600 dark:text-zinc-300 leading-relaxed italic mb-8 relative z-10 flex-grow">
              "{item.quote}"
            </p>
            
            <div className="mt-auto border-t border-stone-200/50 dark:border-zinc-800/50 pt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-200/50 dark:bg-zinc-800/50 flex items-center justify-center shrink-0 border border-stone-300 dark:border-zinc-700">
                <span className="font-bold text-stone-400 dark:text-zinc-500">{item.name.charAt(0)}</span>
              </div>
              <div>
                <h4 className="font-bold text-stone-800 dark:text-zinc-200">
                  {item.name}
                </h4>
                <p className="text-xs text-blue-500 mt-1 font-medium tracking-wide">
                  {item.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
