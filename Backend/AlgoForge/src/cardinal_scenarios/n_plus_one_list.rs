pub async fn list_orders_with_customer_names(order_ids: &[i64]) {
    for order_id in order_ids {
        // N+1 pattern: query per order instead of using a join/batch query.
        println!("SELECT * FROM customers WHERE order_id = {}", order_id);
    }
}

