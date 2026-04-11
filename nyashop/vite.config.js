import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

let inventory = [
  {
    id: '1',
    inventory_name: 'Котяча кружка з вушками',
    description: 'Мила керамічна кружка для чаю або кави. Ідеальний подарунок для всіх котоманів.',
    photo: '/uploads/demo-mug.avif'
  },
  {
    id: '2',
    inventory_name: 'М\'яка подушка-батон "Довгий Кіт"',
    description: 'Дуже довгий та м\'який плюшевий котик для обіймів та затишного сну.',
    photo: '/images/cat-long-pillow.png'
  },
  {
    id: '3',
    inventory_name: 'Рожевий чокер-нашийник з сердечком',
    description: 'Елегантний рожевий нашийник-чокер з підвіскою-сердечком для справжніх принцес.',
    photo: '/images/pink-heart-collar.png'
  },
  {
    id: '4',
    inventory_name: 'Обруч "Котяче вушка" з дзвіночками',
    description: 'Стильний аксесуар для косплею або тематичної вечірки з милими вушками та бантиками.',
    photo: '/images/cat-ears-bells.png'
  },
  {
    id: '5',
    inventory_name: 'Набір керамічних кружок-котиків',
    description: 'Набір із двох керамічних горняток, які ідеально доповнюють одне одного.',
    photo: '/images/cat-ceramic-mugs.png'
  },
  {
    id: '6',
    inventory_name: 'Нічник "Котик на Місяці"',
    description: 'Чарівний світильник, що створює казкову атмосферу у вашій кімнаті.',
    photo: '/images/cat-moon-lamp.png'
  },
  {
    id: '7',
    inventory_name: 'Блокнот Moleskine Hello Kitty (Red)',
    description: 'Лімітована серія блокнотів Moleskine у червоному кольорі з улюбленим персонажем.',
    photo: '/images/hello-kitty-moleskine.png'
  },
  {
    id: '8',
    inventory_name: 'Футболка "Kitty & Cinnamoroll"',
    description: 'Мила рожева футболка з принтом Hello Kitty та Cinnamoroll.',
    photo: '/images/kitty-cinamorol-tshirt.png'
  },
  {
    id: '9',
    inventory_name: 'Рожеві серветки Hello Kitty',
    description: 'Набір паперових серветок для святкового столу або щоденного використання.',
    photo: '/images/hello-kitty-napkins.png'
  },
  {
    id: '10',
    inventory_name: 'Сумка-шопер "Strawberry Kitty"',
    description: 'Містка тканева сумка для покупок з яскравим "полуничним" принтом.',
    photo: '/images/kitty-strawberry-tote.png'
  },
  {
    id: '11',
    inventory_name: 'Планер Hello Kitty на 2026 рік',
    description: 'Зручний щоденник для планування ваших справ та мрій на цілий рік.',
    photo: '/images/kitty-planner-2026.png'
  },
  {
    id: '12',
    inventory_name: 'Подушка-дакімакура Hello Kitty',
    description: 'Велика декоративна подушка для комфортного відпочинку.',
    photo: '/images/kitty-dakimakura.png'
  },
  {
    id: '13',
    inventory_name: 'Набір горняток Hello Kitty Friends',
    description: 'Подарунковий набір оригінальних кружок з друзями Hello Kitty.',
    photo: '/images/hello-kitty-mugs-set.png'
  },
  {
    id: '14',
    inventory_name: 'Картина "Starry Night Cat"',
    description: 'Постер у стилі Ван Гога з силуетом котика під зоряним небом.',
    photo: '/images/cat-starry-night-art.png'
  },
  {
    id: '15',
    inventory_name: 'Колекція магнітів на холодильник',
    description: 'Набір милих магнітиків з котиками для вашої кухні.',
    photo: '/images/cat-fridge-magnets.png'
  },
  {
    id: '16',
    inventory_name: 'Чохол Hello Kitty для iPhone',
    description: 'Захисний силіконовий чохол з об\'ємним зображенням Hello Kitty.',
    photo: '/images/hello-kitty-iphone-case.png'
  },
  {
    id: '17',
    inventory_name: 'Декоративна гірлянда "Манекі-неко"',
    description: 'Традиційна японська прикраса для залучення удачі та радості.',
    photo: '/images/maneki-neko-garland.png'
  },
  {
    id: '18',
    inventory_name: 'Спіральний блокнот "Kitiki"',
    description: 'Зручний записник на спіралі для навчання чи нотаток.',
    photo: '/images/kitiki-spiral-notebook.png'
  },
  {
    id: '19',
    inventory_name: 'Набір значків-пінів "Cat Power"',
    description: 'Колекційні металеві піни для рюкзака або одягу.',
    photo: '/images/cat-badge-pins.png'
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

    server.middlewares.use(async (req, res, next) => {
      const url = new URL(req.url, `http://${req.headers.host}`)
      const id = url.pathname.split('/')[2]

      if (url.pathname === '/inventory' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(inventory))
      }

      if (url.pathname.startsWith('/inventory/') && req.method === 'GET' && !url.pathname.endsWith('/photo')) {
        const item = inventory.find(i => i.id === id)
        res.setHeader('Content-Type', 'application/json')
        if (!item) {
          res.statusCode = 404
          return res.end(JSON.stringify({ message: 'Not found' }))
        }
        return res.end(JSON.stringify(item))
      }

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

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mockApiPlugin(),
  ],
})
