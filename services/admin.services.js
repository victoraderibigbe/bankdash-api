const db = require('../model');
const { AppError } = require('../utils/error');
const worker = db.Workers;
const crypto = require('crypto');
const Admin = db.Admin


class AdminService {
    async createworker(data) {
        try {
            let workers = await worker.findOne({
                where: {
                    workerMail: data.workerMail
                }
            })
            if (workers) {
                throw new AppError(`worker with mail: ${data.workerMail} already exists`, 400)
            }
            workered = await worker.findOne({
                where: {
                    username: data.username
                }
            })
            if (workered) {
                throw new AppError(`worker with username: ${data.username} already exists`, 400)
            }
            worker = await worker.create(data);
            return worker;
        } catch (error) {

            throw new AppError(error.message, 400);
        }
    }


    async updateBio(userId,data){
        try {
            const user = await Admin.update({
                email : data
            }, {
                where : {adminId : userId}
            })
            return user
        } catch (error) {
            throw error
        }
    }

    async getAllworkers(){
        try{
            const workers = await worker.findAll();
            return workers
        }catch (error){
            throw error;
        }
    }

    async getworkerById(id){
        try{
            const worker = await worker.findOne({
                where : {workerId : id }
            });
            return worker
        }catch (error){
            throw error;
        }
    }

    async updateworkerById(id,data,image){
        try{
            const worker  = await worker.findByPk(id)
            if (!worker) {
                return res.status(401).json({ message: 'Unexpected error' })
            }
            if(image){
                const imageUrl = await fileUpload(image, 'profile');
                data.profileImage = imageUrl;
            }
            const updated = await worker.update(data)
            return updated
        }catch (error){
            throw error;
        }
    }

    async DeactivateworkerById(id){
        try{
            const worker  = await worker.findByPk(id)
            if (!worker) {
                return res.status(401).json({ message: 'Unexpected error' })
            }
            worker.DeactivateAccount = true
            const updated = await worker.update(worker)
            return updated
        }catch (error){
            throw error;
        }
    }

    async getworkerByfilter(data){
        try{
            const filter = {
                [Op.or]: [
                  { workerType : `${data}` }
                ]
              }; 
            const worker = await worker.findAll({where : filter})
            return worker
        }catch (error){
            throw error;
        }
    }

}


module.exports = new AdminService();
