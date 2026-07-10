# 11 Call Routing And Revenue Tracking

Buyer fields: buyer_id, buyer_name, status, markets, services, open_hours, daily_cap, payout, min_call_duration, fallback_number.

Match market first, service second, then filter inactive or capped buyers. Use fallback number when no buyer matches.
