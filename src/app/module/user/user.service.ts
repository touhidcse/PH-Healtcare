import { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";

const uploadProfileImage = async (buffer: Buffer, userId: string) => {
	//    cloudinary.uploader.upload_stream(
	//         {
	//             resource_type:"auto"
	//         },

	//         async (error, result)=>{
	//             if(error){
	//                 console.log(error);
	//                 throw new Error(error.message)
	//             }
	//             console.log(result,"result");

	//             const updateUser = await prisma.user.update({
	//                 where : {
	//                     id: userId
	//                 },
	//                 data: {
	//                     imageURL: result?.secure_url,
	//                     imagePublicId: result?.public_id
	//                 }
	//             })

	//             console.log(updateUser);
	//         }
	//     ).end(buffer)

    const currentUser = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            imagePublicId: true,
            imageURL: true,
        }
    })


	const cloudinaryResult = await new Promise<UploadApiResponse>((reslove, reject) => {
		cloudinary.uploader
			.upload_stream(
				{
					resource_type: "auto",
				},

				async (error, result) => {
					if (error) {
						return reject(error);
					}

                    if(!result){
                        return reject(new Error("No result returned from cloudinary"))
                    }
					reslove(result);
				},
			)
			.end(buffer);
	});

	const updateUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			imageURL: cloudinaryResult?.secure_url,
			imagePublicId: cloudinaryResult?.public_id,
		},
        omit:{
            password: true
        }
	});

	// console.log(updateUser);

    // cloudinary theke ager image delete koara 

    if(currentUser?.imagePublicId && currentUser.imageURL){
        await cloudinary.uploader.destroy(currentUser.imagePublicId)
    }

	return updateUser;
};

export const UserServices = {
	uploadProfileImage,
};
