'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Three.js Animated Background Component
function FloatingParticles() {
  const ref = useRef<THREE.Points>(null!)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)

    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6EE7B7"
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  )
}

function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: true }}
      >
        <FloatingParticles />
      </Canvas>
    </div>
  )
}

// Project data
const projects = [
  {
    id: 1,
    title: "Coach Assistant de Proyectos",
    description: "Asistente de IA que ayuda a gestionar y planificar proyectos de ingeniería o académicos de manera eficiente.",
    icon: "🤖",
    techStack: ["Laravel", "OpenAI API", "Workflows"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 2,
    title: "Generador de Sesiones Educativas",
    description: "Genera sesiones educativas completas con objetivos, actividades y evaluaciones estructuradas.",
    icon: "📚",
    techStack: ["Python", "GPT Models", "Education AI"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 3,
    title: "Generador de Artículos Científicos",
    description: "Crea borradores de artículos científicos siguiendo estructura académica formal y reglas de citación.",
    icon: "📄",
    techStack: ["Flask", "OpenAI", "Academic AI"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 4,
    title: "Elixa English",
    description: "App personal para practicar conversación en inglés con inteligencia artificial avanzada.",
    icon: "🗣️",
    techStack: ["React", "Whisper", "GPT API"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 5,
    title: "WebPages Collection",
    description: "Colección de landing pages modernas y prototipos de e-commerce creados por SmartChatix.",
    icon: "🌐",
    techStack: ["WordPress", "Next.js", "Stripe", "E-commerce"],
    demoLink: "/webpages",
    codeLink: "#",
    featured: true
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -15
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

const hoverVariants = {
  hover: {
    y: -10,
    rotateX: 5,
    rotateY: 5,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

export default function Portfolio() {
  return (
    <section className="relative min-h-screen py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 z-1" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-lg">🚀</span>
            <span className="text-cyan-400 font-semibold text-sm tracking-wider uppercase">
              Portafolio SmartChatix
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent leading-tight">
            Explora nuestras creaciones
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Inteligencia, innovación y propósito en cada proyecto que desarrollamos.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              className={`
                group relative rounded-2xl overflow-hidden backdrop-blur-xl
                bg-gradient-to-br from-white/5 to-white/[0.02]
                border border-white/10 hover:border-cyan-500/30
                transition-all duration-500
                ${project.featured ? 'md:col-span-2 lg:col-span-3' : ''}
              `}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-xl" />
              </div>

              <motion.div
                variants={hoverVariants}
                className="relative p-8 h-full"
              >
                {/* Project Icon */}
                <motion.div
                  className="text-4xl mb-6 block"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-200"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.demoLink}
                    className={`
                      px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                      ${project.featured
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-400 hover:to-purple-500'
                        : 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 hover:from-cyan-400 hover:to-emerald-400'
                      }
                    `}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {project.featured ? 'Ver Proyectos' : 'Ver Demo'}
                  </motion.a>

                  {!project.featured && (
                    <motion.a
                      href={project.codeLink}
                      className="px-6 py-3 rounded-xl font-semibold text-sm border border-white/20 text-gray-300 hover:border-white/40 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Código
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            ¿Te inspira alguno de estos proyectos?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Desarrollamos soluciones personalizadas que transforman ideas en realidad tecnológica.
          </p>

          <motion.a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-lg shadow-2xl shadow-cyan-500/25"
            whileHover={{
              scale: 1.05,
              y: -3,
              boxShadow: "0 25px 50px -12px rgba(110, 231, 183, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <span>Quiero una solución como esta</span>
            <motion.span
              className="text-xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              ✨
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// For static export compatibility
export async function getStaticProps() {
  return {
    props: {},
  }
}