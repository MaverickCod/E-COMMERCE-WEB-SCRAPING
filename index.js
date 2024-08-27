
const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const excelJs = require("exceljs")


async function scrapeData() {
    try {
        const response = await axios.get("https://www.amazon.in/s?k=laptop");
        const $ = cheerio.load(response.data);
        const products = [];

        $(".s-main-slot .a-section").each((index,element)=>{
            const name = $(element).find("h2 a span").text().trim();
            const price = $(element).find("span .a-price-whole").text();
            const rating = $(element).find("span .a-icon-alt").text().trim();
            const availability = $(element).find('#availability .a-size-medium').text().trim() || 'In Stock';
            
            if(name && price && rating && availability){
                products.push({name , price , rating , availability})
            }
        })

        return products;
    } catch (error) {
        console.error("Error scraping data:", error);
        return [];
      }
}
async function saveToExcel(products) {
    const workbook = new excelJs.Workbook();
    const worksheet = workbook.addWorksheet("Products")
    worksheet.columns = [
        { header: 'Product Name', key: 'name', width: 60 },
        { header: 'Price', key: 'price', width: 15 },
        { header: 'Product Rating', key: 'rating', width: 15 },
        { header: 'Availability', key: 'availability', width: 10 },
    ];

    products.forEach((product)=>{
         worksheet.addRow(product)
    })

    await workbook.xlsx.writeFile("products.xlsx")
    console.log('Data saved to products.xlsx');
}



async function main() {
    try{
      const products = await scrapeData();
      await saveToExcel(products)
    }catch(err){
        console.log(err.message)
    }
}
main()