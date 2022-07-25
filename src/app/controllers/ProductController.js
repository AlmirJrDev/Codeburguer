import * as Yup from 'yup'
import Product from '../models/Product'

class ProductController {
    async store(request, response) {
        
    try{    
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required(),
        })

     

        try {
            await schema.validateSync(request.body, { abortEarly: false     })
        } catch (err) {
            return response.status(400).json({error: err.errors })
        }

        const { filename: path } = request.file
        const { name, price, category } = request.body  

        const produtc = await Product.create({
            name,
            price,
            category,
            path,   
        }); 
        
    } catch (err) {
        console.log(err)
 }

        return response.json(produtc)
    }
    async index( request, response) {
        const products = await Product.findAll()

        return response.json(products)
    }
}

export default new ProductController