---
title: Predictive Maintenance Program
summary: An automated predictive maintenance program for HVAC motors, reducing unexpected maintenance costs by 15%.
tags: [coding, professional]
codeAvailable: false
order: 1
images:
  - src: ../../assets/projects/predictive-maintenance/pm-graphic-1.png
    alt: Equipment health score dashboard over time
  - src: ../../assets/projects/predictive-maintenance/pm-data-flow.jpg
    alt: Data flow diagram for the predictive maintenance pipeline
  - src: ../../assets/projects/predictive-maintenance/pm-score.jpg
    alt: Score calculation methodology
  - src: ../../assets/projects/predictive-maintenance/pm-building-expected-costs.jpg
    alt: Demo dashboard for estimated repair cost budgeting
---

## Description

I conceived, developed, and implemented an advanced predictive maintenance program targeting various HVAC motors. The program harnesses live data, motor design specifications, and predictive modeling techniques to proactively detect equipment degradation and suboptimal performance, with the goal of mitigating costly, unforeseen equipment failures.

## Methods and Tools

1. **Real-Time Monitoring:** continuous collection of HVAC motor performance metrics, the foundation for early anomaly detection.
2. **Historical Data Analysis:** uncovering trends and anomalies in past motor behavior to understand equipment evolution.
3. **Data Preprocessing:** cleaning, transforming, and validating the dataset by eliminating stagnant or out-of-range data.
4. **Predictive Modeling:** forecasting equipment performance from historical trends and design specifications to detect anomalies and predict failures.
5. **Feature Engineering:** creating pertinent features from the dataset to capture nuanced patterns and improve predictive accuracy.

## Results

After the model was built, 8 pieces of equipment were selected for vibration testing to verify the program's results. The model predicted the failing equipment with an 87% accuracy rate (7 of 8). Seven of the units were found to have severe bearing fatigue or motor failure and were scheduled for replacement or repairs.

We're able to filter by equipment, motor Hz, and timestamp to visualize the health score over time and by motor-speed bin. Scores generally decreased in the upper motor speeds first, slowly transitioning to all motor speeds.

## Code Sample

The actual implementation is proprietary work product and unavailable to share. The snippet below illustrates the pipeline's structure and step order — not the real formulas or business logic, which is where the actual IP lives.

```python
# Illustrative pipeline structure only — not the actual implementation
def run_predictive_maintenance_pipeline(motor_id: str):
    raw_data = fetch_live_motor_data(motor_id)              # CICS -> SQL
    clean_data = validate_and_clean(raw_data)                 # integrity check
    design_specs = load_design_specifications(motor_id)
    expected_kw = back_calculate_expected_kw(                 # first fan law
        clean_data, design_specs
    )
    score = calculate_health_score(                           # 0-10 scale
        clean_data.actual_kw, expected_kw
    )
    push_to_powerbi_dashboard(motor_id, score)
```

1. **Secure Connection:** a secure connection between CICS (the building management system) and SQL, where all data processing took place.
2. **Data Integrity Check:** flagging anomalies — out-of-range values, stagnant data, and equipment operational status.
3. **Integration of Design Data:** back-calculating expected kW draw at a given motor speed or airflow, using the first fan law.
4. **Score Calculation:** a 0–10 score from predicted vs. actual kW, indicating equipment health and performance.
5. **Power BI Dashboard:** inserting the calculated scores into a dashboard for a visual representation of equipment status and trends.

## Next Steps

1. Integrate a lifetime data pool to estimate equipment lifetime from the predictive maintenance score, validated through vibration-testing pilots over time.
2. Generate an estimated repair cost for faulty parts and equipment to support long-term budgeting.
