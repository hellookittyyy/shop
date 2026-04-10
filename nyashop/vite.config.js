import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

// --- Mock API Logic ---
let inventory = [
  {
    id: '1',
    inventory_name: 'Котяча кружка з вушками',
    description: 'Мила керамічна кружка для чаю або кави. Ідеальний подарунок для всіх котоманів.',
    photo: '/uploads/demo-mug.avif'
  },
  {
    id: '2',
    inventory_name: 'Рожевий нашийник "Princess"',
    description: 'Нашийник зі стразами та дзвоником для справжньої принцеси.',
    photo: null
  }
];

const mockApiPlugin = () => ({
  name: 'mock-api',
  configureServer(server) {
    const uploadDir = path.resolve(__dirname, 'public/uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, uploadDir),
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
      }
    })
    const upload = multer({ storage })

    // JSON body parser for Vite middleware
    server.middlewares.use((req, res, next) => {
      if (req.headers['content-type'] === 'application/json') {
        let body = ''
        req.on('data', chunk => body += chunk)
        req.on('end', () => {
          try { req.body = body ? JSON.parse(body) : {} } catch (e) {}
          next()
        })
      } else {
        next()
      }
    })

    // API Routes
    server.middlewares.use(async (req, res, next) => {
      const url = new URL(req.url, `http://${req.headers.host}`)
      const id = url.pathname.split('/')[2]

      // GET /inventory
      if (url.pathname === '/inventory' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(inventory))
      }

      // GET /inventory/:id
      if (url.pathname.startsWith('/inventory/') && req.method === 'GET' && !url.pathname.endsWith('/photo')) {
        const item = inventory.find(i => i.id === id)
        res.setHeader('Content-Type', 'application/json')
        if (!item) {
          res.statusCode = 404
          return res.end(JSON.stringify({ message: 'Not found' }))
        }
        return res.end(JSON.stringify(item))
      }

      // POST /register (multipart)
      if (url.pathname === '/register' && req.method === 'POST') {
        return upload.single('photo')(req, res, (err) => {
          if (err) { res.statusCode = 500; return res.end(); }
          const { inventory_name, description } = req.body
          const newItem = {
            id: Date.now().toString(),
            inventory_name,
            description: description || '',
            photo: req.file ? `/uploads/${req.file.filename}` : null
          }
          inventory.push(newItem)
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 201
          return res.end(JSON.stringify(newItem))
        })
      }

      // PUT /inventory/:id (JSON)
      if (url.pathname.startsWith('/inventory/') && req.method === 'PUT' && !url.pathname.endsWith('/photo')) {
        const itemIndex = inventory.findIndex(i => i.id === id)
        if (itemIndex === -1) {
          res.statusCode = 404
          return res.end(JSON.stringify({ message: 'Not found' }))
        }
        const { inventory_name, description } = req.body
        if (inventory_name) inventory[itemIndex].inventory_name = inventory_name
        if (description !== undefined) inventory[itemIndex].description = description
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(inventory[itemIndex]))
      }

      // PUT /inventory/:id/photo (multipart)
      if (url.pathname.startsWith('/inventory/') && url.pathname.endsWith('/photo') && req.method === 'PUT') {
        return upload.single('photo')(req, res, (err) => {
          if (err) { res.statusCode = 500; return res.end(); }
          const itemIndex = inventory.findIndex(i => i.id === id)
          if (itemIndex === -1) {
            res.statusCode = 404
            return res.end(JSON.stringify({ message: 'Not found' }))
          }
          if (req.file) {
            inventory[itemIndex].photo = `/uploads/${req.file.filename}`
          }
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify(inventory[itemIndex]))
        })
      }

      // DELETE /inventory/:id
      if (url.pathname.startsWith('/inventory/') && req.method === 'DELETE') {
        const itemIndex = inventory.findIndex(i => i.id === id)
        if (itemIndex === -1) {
          res.statusCode = 404
          return res.end(JSON.stringify({ message: 'Not found' }))
        }
        inventory.splice(itemIndex, 1)
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify({ message: 'Deleted' }))
      }

      next()
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mockApiPlugin(),
  ],
})
