---
title: Raspberry Pi System Health Dashboard
summary: "Built a real-time Raspberry Pi health dashboard to find out if a temperature-controlled fan was actually doing anything. Various testing yields interesting result."
tags: [coding, hardware, personal]
codeAvailable: true
order: 2
repoUrl: https://github.com/hhunterr71/rasberrypi4_zero_to_hero/tree/main/Captsone_1_System%20Heath%20and%20Fan%20Optimization
images:
  - src: ../../assets/projects/rasberry-pi/hardware_setup.jpeg
    alt: Raspberry Pi 4 Model B open in its case with a small fan wired via GPIO
  - src: ../../assets/projects/rasberry-pi/fan_comparison.png
    alt: Temperature comparison and fan toggle count across three phases — no fan, naive threshold control, and hysteresis control — all converging near 165°F
---

## Background

My day job is monitoring building systems, sampling sensor data, logging it, and finding the signal in the noise. I wanted to know what it felt like to build that same pipeline from scratch, on hardware I wired myself, starting from zero. A Raspberry Pi was the obvious place to start.

This project grew out of a series of foundation modules (GPIO control, PWM, sensor integration) that culminated in one question I actually wanted answered: *is this fan doing anything?*

## What It Does

The dashboard monitors the Pi's own vitals in real time — CPU load, temperature, memory, disk usage, and throttle status — and logs every sample to CSV as it runs. No separate logging step needed; every reading visible on screen is also written to disk.

The terminal interface is built with Python's `rich` library, which renders a live-updating table with sparkline graphs (compact Unicode trend bars) for CPU and temperature — so you can see the direction things are moving, not just the current number. Throttle status is read from `vcgencmd get_throttled`, the Pi's own diagnostic register for whether it has ever had to slow itself down due to heat or power constraints. That's the single most useful number for "am I overtaxing this thing."

## The Experiment

With a working dashboard and logger in place, the natural next step was to wire up a small 5V fan through a transistor and run a controlled comparison. Three phases, back-to-back, under one continuous CPU stress load:

1. **No fan** — fan wired but forced off in code; establishes a thermal baseline
2. **Naive control** — single threshold: fan on above 136°F, off below it
3. **Hysteresis control** — two thresholds: fan on above 140°F, stays on until it drops below 131°F

The hysteresis band prevents *chattering* — the naive strategy causes the fan to flip on and off rapidly when temperature hovers near the threshold, which is hard on the motor and doesn't reflect the Pi's actual cooling need. The toggle-count comparison between the two strategies makes this concrete and numeric rather than theoretical.

All three phases ran from a single script that managed the stress process, logged every sample to one CSV with a `phase` column, and produced the comparison chart automatically at the end.

## What I Found

The toggle-count comparison turned out to be anticlimactic in the best way: naive control toggled once and stayed on; hysteresis never toggled at all. Case closed on chattering — but the temperature chart told a more interesting story than the one I was expecting.

The no-fan run started from a cold boot and still climbed to ~155°F under load. The two fan runs, by contrast, started *hot* (carried over thermal mass from the previous test) and sat at 165–170°F the entire time — barely moving regardless of whether the fan was on, off, or being toggled at all.

All three conditions converged into roughly the same range. The stock 5V fan just wasn't moving enough air to make a measurable dent against a sustained 4-core stress load.

I'd gone in assuming the fan that shipped with the kit was already tuned for this — turns out that was the wrong assumption. The data made it pretty clear the airflow itself was the bottleneck, not the control logic. Next step is testing whether a larger 5V fan actually moves the needle, and whether adding thermal pads/heatsinks gets any passive cooling even under the same undersized fan.

## Tools

- **Python** — `psutil`, `rich`, `gpiozero`, `matplotlib`, `subprocess`
- **Raspberry Pi OS** — `vcgencmd` for onboard thermal and throttle diagnostics
- **`stress`** — CPU load generation for controlled testing
