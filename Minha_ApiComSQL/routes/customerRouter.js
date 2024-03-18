"use strict"

const express = require("express")
const customerModel = require("../models/customer")
const customerRouter = express.Router()
exports.customerRouter = customerRouter

customerRouter.get('/', async (req, res) => {
    customerModel.findAll((err, customers) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }
        res.status(200).json({ "data": customers })
    })
})

customerRouter.get('/:id', async (req, res) => {
    const customerId = Number(req.params.id)
    customerModel.findOne(customerId, (err, customer) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }
        res.status(200).json({ "data": customer })
    })
})

customerRouter.post('/', async (req, res) => {
    const newCustomer = req.body
    customerModel.create(newCustomer, (err, customerId) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message })
        }
        res.status(200).json({ "customerId": customerId })
    })
})

customerRouter.put('/:id', async (req, res) => {
    const customer = req.body
    customerModel.update(customer, (err) => {
        if (err) {
            return res.status(500).json({ "message": err.message })
        }
        res.status(200).send()
    })
})

customerRouter.delete('/:id', async (req, res) => {
    const customerId = Number(req.params.id)
    customerModel.deleteCustomer(customerId, (err) => {
        if (err) {
            return res.status(500).json({ "message": err.message })
        }
        res.status(200).json({ "message": "Customer deleted successfully" })
    })
})
