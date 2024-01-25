export function getSize(category) {
    let matchingSize;

    productSizes.forEach((size) => {
        if (category === size.category) {
            matchingSize = size.sizes;
        }
    });

    return matchingSize;
}

export const productSizes = [
    {
        category: "Shirts",
        sizes: [
            {
                sizeId: "shirt-s",
                name: "S"
            },
            {
                sizeId: "shirt-m",
                name: "M"
            },
            {
                sizeId: "shirt-l",
                name: "L"
            },
            {
                sizeId: "shirt-xl",
                name: "XL"
            }
        ]
    },
    {
        category: "Shorts",
        sizes: [
            {
                sizeId: "short-s",
                name: "S"
            },
            {
                sizeId: "short-m",
                name: "M"
            },
            {
                sizeId: "short-l",
                name: "L"
            },
            {
                sizeId: "short-xl",
                name: "XL"
            }
        ]
    },
    {
        category: "Shoes",
        sizes: [
            {
                sizeId: "shoes-m5-w6-5",
                name: "M 5 / W 6.5"
            },
            {
                sizeId: "shoes-m5-5-w7",
                name: "M 5.5 / W 7"
            },
            {
                sizeId: "shoes-m6-w7-5",
                name: "M 6 / W 7.5"
            },
            {
                sizeId: "shoes-m6-5-w8",
                name: "M 6.5 / W 8"
            },
            {
                sizeId: "shoes-m7-w8-5",
                name: "M 7 / W 8.5"
            },
            {
                sizeId: "shoes-m7-5-w9",
                name: "M 7.5 / W 9"
            },
            {
                sizeId: "shoes-m8-w9-5",
                name: "M 8 / W 9.5"
            },
            {
                sizeId: "shoes-m8-5-w10",
                name: "M 8.5 / W 10"
            },
            {
                sizeId: "shoes-m9-w10-5",
                name: "M 9 / W 10.5"
            },
            {
                sizeId: "shoes-m9-5-w11",
                name: "M 9.5 / W 11"
            },
            {
                sizeId: "shoes-m10-w11-5",
                name: "M 10 / W 11.5"
            },
            {
                sizeId: "shoes-m10-5-w12",
                name: "M 10.5 / W 12"
            }
        ]
    },
    {
        category: "Accessories",
        sizes: [
            {
                sizeId: "accessory-s",
                name: "S"
            },
            {
                sizeId: "accessory-m",
                name: "M"
            },
            {
                sizeId: "accessory-l",
                name: "L"
            }
        ]
    }
]