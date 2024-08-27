const XLSX = require('xlsx');

async function createWorkbook() {
    const ws = XLSX.utils.aoa_to_sheet([
        ['Name', 'Price', 'Rating', 'Availability'],
        ['Item 1', '₹1000', '4.5', 'Available'],
        ['Item 2', '₹2000', '4.0', 'Not Available']
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Amazon New Releases');

    XLSX.writeFile(wb, 'amazon_new_releases.xlsx');
    console.log('Workbook created successfully!');
}

createWorkbook();
