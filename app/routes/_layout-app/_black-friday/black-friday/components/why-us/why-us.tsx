// // Photos from https://citizenofnowhe.re/lines-of-the-city
// // import "./styles.css";
// import { useRef } from "react";
// import { motion } from "motion/react"
// import {
//   motion,
//   useScroll,
//   useSpring,
//   useTransform,
//   MotionValue
// } from "framer-motion";

// function useParallax(value: MotionValue<number>, distance: number) {
//   return useTransform(value, [0, 1], [-distance, distance]);
// }

// function Image({ id }: { id: number }) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref });
//   const y = useParallax(scrollYProgress, 300);

//   return (
//     <section>
//       <div ref={ref}>
//         <img width={'130px'} src={`https://www.pontotel.com.br/local/wp-content/uploads/2022/05/imagem-corporativa.webp`} alt="A London skyscraper" />
//       </div>
//       <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
//     </section>
//   );
// }

// export default function App() {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   return (
//     <>
//       {[1, 2, 3, 4, 5].map((image) => (
//         <Image id={image} />
//       ))}
//       <motion.div className="progress" style={{ scaleX }} />
//     </>
//   );
// }

import { motion } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function WhyUs() {
  return (
    <>
      {" "}
      <motion.h1
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0.5, y: -10 },
        }}
        className="mb-8 text-2xl lg:text-4xl font-light font-lexend text-center"
      >
        A nossa plataforma é{" "}
        <span className="color-underline decoration-amber-400">
          ideal para quem...
        </span>
      </motion.h1>
      <p className="mt-2 mb-2 font-light font-inter text-xl text-center w-full w-3/4 dark:text-gray-300 text-gray-600">
        Nossos cursos foram pensados para quem quer{" "}
        <span className="color-underline decoration-amber-400">
          crescer na carreira
        </span>{" "}
        de{" "}
        <span className="color-underline decoration-brand-500">
          forma prática
        </span>{" "}
        e com suporte.
      </p>
      <div className="flex justify-between items-center">
        <motion.div
          style={{
            width: "300px",
            padding: "30px",
            borderRadius: "10px",
            backgroundColor: "#1e2a47",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            position: "relative",
            zIndex: 0,
            marginTop: "50px",
            marginRight: "20px",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            style={{
              filter: "blur(5px)",
            }}
            animate={{
              opacity: [0, 1],
              filter: ["blur(5px)", "blur(0px)"],
            }}
            transition={{
              duration: 2,
              ease: "ease-out",
            }}
          />

          <motion.div
            style={{ marginBottom: "10px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* <FaBeer size={40} color="rgb(251 191 36 / var(--tw-text-opacity)" />{" "} */}
          </motion.div>
          <motion.h3
            style={{
              fontSize: "20px",
              margin: "10px 0",
              fontWeight: "bold",
              color: "rgb(251 191 36 / var(--tw-text-opacity)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Busca uma formação prática e direta:
          </motion.h3>
          <motion.p
            style={{
              fontSize: "14px",
              color: "#ccc",
              margin: "0",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Você quer aprender o que realmente importa para o mercado, sem
            enrolação ou teoria em excesso.
          </motion.p>
        </motion.div>
        <FaLongArrowAltRight />
        <motion.div
          style={{
            width: "300px",
            padding: "30px",
            borderRadius: "10px",
            backgroundColor: "#1e2a47",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            position: "relative",
            zIndex: 0,
            marginTop: "50px",
            marginRight: "20px",
            marginLeft: "20px",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            style={{
              filter: "blur(5px)",
            }}
            animate={{
              opacity: [0, 1],
              filter: ["blur(5px)", "blur(0px)"],
            }}
            transition={{
              duration: 2,
              ease: "ease-out",
            }}
          />

          <motion.div
            style={{ marginBottom: "10px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* <FaBeer size={40} color="rgb(251 191 36 / var(--tw-text-opacity)" />{" "} */}
          </motion.div>
          <motion.h3
            style={{
              fontSize: "20px",
              margin: "10px 0",
              fontWeight: "bold",
              color: "rgb(251 191 36 / var(--tw-text-opacity)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Quer garantir uma vantagem competitiva:
          </motion.h3>
          <motion.p
            style={{
              fontSize: "14px",
              color: "#ccc",
              margin: "0",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Com habilidades que empresas realmente valorizam, você deseja ser
            visto como alguém que agrega valor e tem potencial.
          </motion.p>
        </motion.div>
        <FaLongArrowAltRight />

        <motion.div
          style={{
            width: "300px",
            padding: "30px",
            borderRadius: "10px",
            backgroundColor: "#1e2a47",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            position: "relative",
            zIndex: 0,
            marginTop: "50px",
            marginRight: "20px",
            marginLeft: "20px",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            style={{
              filter: "blur(5px)",
            }}
            animate={{
              opacity: [0, 1],
              filter: ["blur(5px)", "blur(0px)"],
            }}
            transition={{
              duration: 2,
              ease: "ease-out",
            }}
          />

          <motion.div
            style={{ marginBottom: "10px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* <FaBeer size={40} color="rgb(251 191 36 / var(--tw-text-opacity)" />{" "} */}
          </motion.div>
          <motion.h3
            style={{
              fontSize: "20px",
              margin: "10px 0",
              fontWeight: "bold",
              color: "rgb(251 191 36 / var(--tw-text-opacity)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Precisa de suporte para esclarecer dúvidas:
          </motion.h3>
          <motion.p
            style={{
              fontSize: "14px",
              color: "#ccc",
              margin: "0",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Para avançar com confiança, você sabe que ter acesso a um suporte
            pode ser a chave para desbloquear todo o seu potencial.
          </motion.p>
        </motion.div>
        <FaLongArrowAltRight />
        <motion.div
          style={{
            width: "300px",
            padding: "30px",
            borderRadius: "10px",
            backgroundColor: "#1e2a47",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            position: "relative",
            zIndex: 0,
            marginTop: "50px",
            marginLeft: "20px",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            style={{
              filter: "blur(5px)",
            }}
            animate={{
              opacity: [0, 1],
              filter: ["blur(5px)", "blur(0px)"],
            }}
            transition={{
              duration: 2,
              ease: "ease-out",
            }}
          />

          <motion.div
            style={{ marginBottom: "10px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* <FaBeer size={40} color="rgb(251 191 36 / var(--tw-text-opacity)" />{" "} */}
          </motion.div>
          <motion.h3
            style={{
              fontSize: "20px",
              margin: "10px 0",
              fontWeight: "bold",
              color: "rgb(251 191 36 / var(--tw-text-opacity)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Prefere flexibilidade e acessibilidade:
          </motion.h3>
          <motion.p
            style={{
              fontSize: "14px",
              color: "#ccc",
              margin: "0",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Está em busca de um curso acessível e prático, que você pode começar
            agora mesmo e ajustar ao seu ritmo.
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
