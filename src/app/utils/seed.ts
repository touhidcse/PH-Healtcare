import { Role } from "../../generated/prisma/enums"
import bcript from "bcryptjs"
import { defineConfig } from "prisma/config";
import prismaConfig from "../../../prisma.config";
import config from "../config";
import { prisma } from "../lib/prisma";
import { error } from "node:console";

export const seedSuperAdmin = async () =>{
    try {
        const isSuperAdminExist = await prisma.user.findFirst({
            where: {
                role: Role.SUPER_ADMIN
            }
        });
        if(isSuperAdminExist){
            console.log("Super Admin is already exist");
            return;
        }

        const name = config.super_admin_name
        const email = config.super_admin_email
        const password = config.super_admin_password
        const hashedPassword = await bcript.hash(password, Number(config.bcrypt_salt_rounds))

        if(!name || !email || !password){
            throw new Error ("Super Admin's  Name, Email , password missing in env file")
        }
        const SuperAdmin = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role : Role.SUPER_ADMIN,
                emailVerified: true,
            }
        })
        console.log("Super Admin created: ", SuperAdmin);
    
    } catch (error) {
        console.log("Error seeding Suepr Admin: ",error);
        await prisma.user.delete({
            where: {
                email: config.super_admin_email
            }
        })
        
    }
}
export const seedTesterAdmin = async () =>{
    try {
        const isTesterAdminExist = await prisma.user.findUnique({
            where: {
                email: config.tester_admin_email
            }
        });
        if(isTesterAdminExist){
            console.log("Tester Admin is already exist");
            return;
        }

        const name = config.tester_admin_name
        const email = config.tester_admin_email
        const password = config.tester_admin_password
        const hashedPassword = await bcript.hash(password, Number(config.bcrypt_salt_rounds))

        if(!name || !email || !password){
            throw new Error ("Tester Admin's  Name, Email , password missing in env file")
        }
        const TesterAdmin = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role : Role.ADMIN,
                needPasswordChange:false,
                emailVerified: true,
            }
        })
        console.log("Tester Admin created: ", TesterAdmin);
    
    } catch (error) {
        console.log("Error seeding Tester Admin: ",error);
        await prisma.user.delete({
            where: {
                email: config.tester_admin_email
            }
        })
        
    }
}
export const seedTesterDoctor = async () =>{
    try {
        const isTesterDoctorExist = await prisma.user.findUnique({
            where: {
                email: config.tester_doctor_email
            }
        });
        if(isTesterDoctorExist){
            console.log("Tester Doctor is already exist");
            return;
        }

        const name = config.tester_doctor_name
        const email = config.tester_doctor_email
        const password = config.tester_doctor_password
        const hashedPassword = await bcript.hash(password, Number(config.bcrypt_salt_rounds))

        if(!name || !email || !password){
            throw new Error ("Tester doctors's  Name, Email , password missing in env file")
        }
        const TesterDoctor = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role : Role.DOCTOR,
                needPasswordChange: false,
                emailVerified: true,
            }
        })
        console.log("Tester Doctor created: ", TesterDoctor);
    
    } catch (error) {
        console.log("Error seeding Tester Doctor: ",error);
        await prisma.user.delete({
            where: {
                email: config.tester_doctor_email
            }
        })
        
    }
}
export const seedTesterPatient = async () =>{
    try {
        const isTesterPatientExist = await prisma.user.findFirst({
            where: {
                role: Role.PATIENT
            }
        });
        if(isTesterPatientExist){
            console.log("Tester patient is already exist");
            return;
        }

        const name = config.tester_patient_name
        const email = config.tester_patient_email
        const password = config.tester_patient_password
        const hashedPassword = await bcript.hash(password, Number(config.bcrypt_salt_rounds))

        if(!name || !email || !password){
            throw new Error ("Tester patients's  Name, Email , password missing in env file")
        }
        const TesterPatient = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role : Role.PATIENT,
                emailVerified: true,
            }
        })
        console.log("Tester Patient created: ", TesterPatient);
    
    } catch (error) {
        console.log("Error seeding Tester Patient: ",error);
        await prisma.user.delete({
            where: {
                email: config.tester_patient_email
            }
        })
        
    }
}