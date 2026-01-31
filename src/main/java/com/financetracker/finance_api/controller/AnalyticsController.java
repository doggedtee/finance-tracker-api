package com.financetracker.finance_api.controller;

import com.financetracker.finance_api.entity.Transaction;
import com.financetracker.finance_api.repository.TransactionRepository;
import com.financetracker.finance_api.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/total-income")
    public double getTotalIncome() {
        return transactionService.getTotalIncome();
    }

    @GetMapping("/total-expenses")
    public double getTotalExpenses() {
        return transactionService.getTotalExpenses();
    }

    @GetMapping("/balance")
    public double getBalance() {
        return transactionService.getBalance();
    }

    @GetMapping("/by-category")
    public Map<String, Double> getSpendingByCategory() {
        return transactionService.getSpendingByCategory();
    }
}
