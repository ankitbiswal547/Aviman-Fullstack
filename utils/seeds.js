const Product = require("../models/product");

const seed = () => {
    Product.insertMany([
        {
            productName: "Fusce faucibus arcu odio, vitae volutpat libero lobortis in",
            category: "spiceBox",
            price: 300,
            discountPrice: 0,
            description: "Nam pellentesque, risus sit amet auctor aliquet, est turpis eleifend turpis, id sagittis augue magna et turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam condimentum tempor libero porta congue. Sed in lobortis mauris. Curabitur sit amet rhoncus quam, vitae fermentum quam. Vestibulum placerat nisi ac sapien congue, eleifend faucibus libero tristique. Mauris et ipsum interdum, euismod quam sed, aliquet sapien. Vestibulum venenatis vestibulum elit, sed cursus sem viverra vitae.",
            productImages: [
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270",
                "https://screentrek.com/wp-content/uploads/2021/05/marguerite-729510__340.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKteLqmvhKKrEpZzJP5QsAumby0zEwCyP4VgmnwpgtRGcxw4Qm-Xx6aOjNmsSG_JqRcVw&usqp=CAU"
            ],
            length: 200,
            breadth: 100,
            height: 50,
            color: "Green",
            material: "Cotton",
            weight: 4000,
            suitableFor: "Everything",
            idealFor: "Everything",
            careInstructions: "Etiam ac lectus ex. In vel lectus vel libero congue volutpat nec a erat. Cras viverra felis et iaculis vulputate. Vivamus nunc arcu, rhoncus vitae massa euismod",
            quantity: 30,
            salesCompleted: 11,
            isOnSale: false,
            averageRating: 0,
            productStory: "https://www.youtube.com/watch?v=tgbNymZ7vqY"
        },
        {
            productName: "Morbi tortor mauris, rutrum eu mi ac, viverra dignissim purus",
            category: "cupsAndMugs",
            price: 300,
            discountPrice: 0,
            description: "Nam pellentesque, risus sit amet auctor aliquet, est turpis eleifend turpis, id sagittis augue magna et turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam condimentum tempor libero porta congue. Sed in lobortis mauris. Curabitur sit amet rhoncus quam, vitae fermentum quam. Vestibulum placerat nisi ac sapien congue, eleifend faucibus libero tristique. Mauris et ipsum interdum, euismod quam sed, aliquet sapien. Vestibulum venenatis vestibulum elit, sed cursus sem viverra vitae.",
            productImages: [
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270",
                "https://screentrek.com/wp-content/uploads/2021/05/marguerite-729510__340.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKteLqmvhKKrEpZzJP5QsAumby0zEwCyP4VgmnwpgtRGcxw4Qm-Xx6aOjNmsSG_JqRcVw&usqp=CAU"
            ],
            length: 200,
            breadth: 100,
            height: 50,
            color: "Green",
            material: "Cotton",
            weight: 4000,
            suitableFor: "Everything",
            idealFor: "Everything",
            careInstructions: "Etiam ac lectus ex. In vel lectus vel libero congue volutpat nec a erat. Cras viverra felis et iaculis vulputate. Vivamus nunc arcu, rhoncus vitae massa euismod",
            quantity: 30,
            salesCompleted: 11,
            isOnSale: false,
            averageRating: 0,
            productStory: "https://www.youtube.com/watch?v=tgbNymZ7vqY"
        },
        {
            productName: "Quisque cursus ligula ac orci dignissim malesuada",
            category: "platesAndPlatters",
            price: 300,
            discountPrice: 0,
            description: "Nam pellentesque, risus sit amet auctor aliquet, est turpis eleifend turpis, id sagittis augue magna et turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam condimentum tempor libero porta congue. Sed in lobortis mauris. Curabitur sit amet rhoncus quam, vitae fermentum quam. Vestibulum placerat nisi ac sapien congue, eleifend faucibus libero tristique. Mauris et ipsum interdum, euismod quam sed, aliquet sapien. Vestibulum venenatis vestibulum elit, sed cursus sem viverra vitae.",
            productImages: [
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270",
                "https://screentrek.com/wp-content/uploads/2021/05/marguerite-729510__340.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKteLqmvhKKrEpZzJP5QsAumby0zEwCyP4VgmnwpgtRGcxw4Qm-Xx6aOjNmsSG_JqRcVw&usqp=CAU"
            ],
            length: 200,
            breadth: 100,
            height: 50,
            color: "Green",
            material: "Cotton",
            weight: 4000,
            suitableFor: "Everything",
            idealFor: "Everything",
            careInstructions: "Etiam ac lectus ex. In vel lectus vel libero congue volutpat nec a erat. Cras viverra felis et iaculis vulputate. Vivamus nunc arcu, rhoncus vitae massa euismod",
            quantity: 30,
            salesCompleted: 11,
            isOnSale: false,
            averageRating: 0,
            productStory: "https://www.youtube.com/watch?v=tgbNymZ7vqY"
        },
        {
            productName: "Duis mattis dolor et massa facilisis, ac fringilla diam maximus",
            category: "potsAndPlanters",
            price: 300,
            discountPrice: 0,
            description: "Nam pellentesque, risus sit amet auctor aliquet, est turpis eleifend turpis, id sagittis augue magna et turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam condimentum tempor libero porta congue. Sed in lobortis mauris. Curabitur sit amet rhoncus quam, vitae fermentum quam. Vestibulum placerat nisi ac sapien congue, eleifend faucibus libero tristique. Mauris et ipsum interdum, euismod quam sed, aliquet sapien. Vestibulum venenatis vestibulum elit, sed cursus sem viverra vitae.",
            productImages: [
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270",
                "https://screentrek.com/wp-content/uploads/2021/05/marguerite-729510__340.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKteLqmvhKKrEpZzJP5QsAumby0zEwCyP4VgmnwpgtRGcxw4Qm-Xx6aOjNmsSG_JqRcVw&usqp=CAU"
            ],
            length: 200,
            breadth: 100,
            height: 50,
            color: "Green",
            material: "Cotton",
            weight: 4000,
            suitableFor: "Everything",
            idealFor: "Everything",
            careInstructions: "Etiam ac lectus ex. In vel lectus vel libero congue volutpat nec a erat. Cras viverra felis et iaculis vulputate. Vivamus nunc arcu, rhoncus vitae massa euismod",
            quantity: 30,
            salesCompleted: 11,
            isOnSale: false,
            averageRating: 0,
            productStory: "https://www.youtube.com/watch?v=tgbNymZ7vqY"
        },
        {
            productName: "Aenean at nunc at erat posuere sollicitudin a at nisl",
            category: "wallHangings",
            price: 300,
            discountPrice: 0,
            description: "Nam pellentesque, risus sit amet auctor aliquet, est turpis eleifend turpis, id sagittis augue magna et turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam condimentum tempor libero porta congue. Sed in lobortis mauris. Curabitur sit amet rhoncus quam, vitae fermentum quam. Vestibulum placerat nisi ac sapien congue, eleifend faucibus libero tristique. Mauris et ipsum interdum, euismod quam sed, aliquet sapien. Vestibulum venenatis vestibulum elit, sed cursus sem viverra vitae.",
            productImages: [
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270",
                "https://screentrek.com/wp-content/uploads/2021/05/marguerite-729510__340.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKteLqmvhKKrEpZzJP5QsAumby0zEwCyP4VgmnwpgtRGcxw4Qm-Xx6aOjNmsSG_JqRcVw&usqp=CAU"
            ],
            length: 200,
            breadth: 100,
            height: 50,
            color: "Green",
            material: "Cotton",
            weight: 4000,
            suitableFor: "Everything",
            idealFor: "Everything",
            careInstructions: "Etiam ac lectus ex. In vel lectus vel libero congue volutpat nec a erat. Cras viverra felis et iaculis vulputate. Vivamus nunc arcu, rhoncus vitae massa euismod",
            quantity: 30,
            salesCompleted: 11,
            isOnSale: true,
            averageRating: 0,
            productStory: "https://www.youtube.com/watch?v=tgbNymZ7vqY"
        },
        {
            productName: "Donec lacus leo, tincidunt ac ligula vel, sodales viverra lacus",
            category: "wallHangings",
            price: 1400,
            discountPrice: 0,
            description: "Nam pellentesque, risus sit amet auctor aliquet, est turpis eleifend turpis, id sagittis augue magna et turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam condimentum tempor libero porta congue. Sed in lobortis mauris. Curabitur sit amet rhoncus quam, vitae fermentum quam. Vestibulum placerat nisi ac sapien congue, eleifend faucibus libero tristique. Mauris et ipsum interdum, euismod quam sed, aliquet sapien. Vestibulum venenatis vestibulum elit, sed cursus sem viverra vitae.",
            productImages: [
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270",
                "https://screentrek.com/wp-content/uploads/2021/05/marguerite-729510__340.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKteLqmvhKKrEpZzJP5QsAumby0zEwCyP4VgmnwpgtRGcxw4Qm-Xx6aOjNmsSG_JqRcVw&usqp=CAU"
            ],
            length: 200,
            breadth: 100,
            height: 50,
            color: "Green",
            material: "Cotton",
            weight: 4000,
            suitableFor: "Everything",
            idealFor: "Everything",
            careInstructions: "Etiam ac lectus ex. In vel lectus vel libero congue volutpat nec a erat. Cras viverra felis et iaculis vulputate. Vivamus nunc arcu, rhoncus vitae massa euismod",
            quantity: 30,
            salesCompleted: 11,
            isOnSale: false,
            averageRating: 0,
            productStory: "https://www.youtube.com/watch?v=tgbNymZ7vqY"
        },
        {
            productName: "In vel lectus vel libero congue volutpat nec a erat",
            category: "lamps",
            price: 300,
            discountPrice: 0,
            description: "Nam pellentesque, risus sit amet auctor aliquet, est turpis eleifend turpis, id sagittis augue magna et turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam condimentum tempor libero porta congue. Sed in lobortis mauris. Curabitur sit amet rhoncus quam, vitae fermentum quam. Vestibulum placerat nisi ac sapien congue, eleifend faucibus libero tristique. Mauris et ipsum interdum, euismod quam sed, aliquet sapien. Vestibulum venenatis vestibulum elit, sed cursus sem viverra vitae.",
            productImages: [
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270",
                "https://screentrek.com/wp-content/uploads/2021/05/marguerite-729510__340.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKteLqmvhKKrEpZzJP5QsAumby0zEwCyP4VgmnwpgtRGcxw4Qm-Xx6aOjNmsSG_JqRcVw&usqp=CAU"
            ],
            length: 500,
            breadth: 100,
            height: 150,
            color: "blue",
            material: "wool",
            weight: 5000,
            suitableFor: "Everything",
            idealFor: "Everything",
            careInstructions: "Etiam ac lectus ex. In vel lectus vel libero congue volutpat nec a erat. Cras viverra felis et iaculis vulputate. Vivamus nunc arcu, rhoncus vitae massa euismod",
            quantity: 20,
            salesCompleted: 11,
            isOnSale: false,
            averageRating: 0,
            productStory: "https://www.youtube.com/watch?v=tgbNymZ7vqY"
        },
        {
            productName: "Nulla facilisi",
            category: "platesAndPlatters",
            price: 300,
            discountPrice: 0,
            description: "Nam pellentesque, risus sit amet auctor aliquet, est turpis eleifend turpis, id sagittis augue magna et turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam condimentum tempor libero porta congue. Sed in lobortis mauris. Curabitur sit amet rhoncus quam, vitae fermentum quam. Vestibulum placerat nisi ac sapien congue, eleifend faucibus libero tristique. Mauris et ipsum interdum, euismod quam sed, aliquet sapien. Vestibulum venenatis vestibulum elit, sed cursus sem viverra vitae.",
            productImages: [
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270",
                "https://screentrek.com/wp-content/uploads/2021/05/marguerite-729510__340.jpg",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKteLqmvhKKrEpZzJP5QsAumby0zEwCyP4VgmnwpgtRGcxw4Qm-Xx6aOjNmsSG_JqRcVw&usqp=CAU"
            ],
            length: 100,
            breadth: 300,
            height: 300,
            color: "red",
            material: "Cotton",
            weight: 2500,
            suitableFor: "Everything",
            idealFor: "Everything",
            careInstructions: "Etiam ac lectus ex. In vel lectus vel libero congue volutpat nec a erat. Cras viverra felis et iaculis vulputate. Vivamus nunc arcu, rhoncus vitae massa euismod",
            quantity: 30,
            salesCompleted: 11,
            isOnSale: false,
            averageRating: 0,
            productStory: "https://www.youtube.com/watch?v=tgbNymZ7vqY"
        }
    ])
        .then(data => {
            console.log("Seeded Data")
        })
        .catch(e => {
            consol.log("Data Unable to seed.")
        })
}

module.exports = seed;