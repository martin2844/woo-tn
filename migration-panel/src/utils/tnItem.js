const tnItem = (item) => {

    let variants;
    if(item.type === "simple") {
        variants = [
            {
                "price": item.price,
                "width": item.dimensions.width,
                "height": item.dimensions.height,
                "depth": item.dimensions.length,
                "weight": item.weight
            }
        ]
    }


    return {
        "name": {
            "es": item.name
        },
        "images": item.images.map((x) => {
            return {
                "src": x.src
            }
        }),
        "variants": variants
    }
}

export default tnItem