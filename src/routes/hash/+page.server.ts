import { decode, encode } from "blurhash";
import sharp from "sharp";

function getReasonableDimensions(n,k){
    const max = ~~Math.sqrt(n);
    return Array.from({length: max}, (_,i,a) => [n%(max-i),max-i])
                .sort((a,b) => a[0] - b[0])
                .slice(0,k)
                .map(t => [Math.floor(n/t[1]), t[1]]);
  }

export const actions = {
    default: async (event) => {
        const data = await event.request.formData()
        const file = data.get("image") as File;
        const blob = data.get("image") as Blob;
        const image = await blob.arrayBuffer()
        const x = data.get("componentX");
        const y = data.get("componentY");
        const {data: pixelArray, info} = await sharp(image).resize({width:700}).raw().ensureAlpha().toBuffer({resolveWithObject:true})
        const hash = encode(new Uint8ClampedArray(pixelArray), info.width, info.height, parseInt(x), parseInt(y));
        const hashArray = decode(hash, info.width, info.height)
        console.log("base64")
        return {
            status: "ok",
            hash,
            preview: {hashArray: [...hashArray], width: info.width, height: info.height}
        }
    }
}