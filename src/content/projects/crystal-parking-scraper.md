---
title: Crystal Parking Reservation Bot
summary: A Flask web app that watches Crystal Mountain's parking calendar and auto-reserves a spot the moment one opens up, with live progress streamed to the browser.
tags: [coding, personal]
repoUrl: https://github.com/hhunterr71/crystal_park_res_bot
liveUrl: https://crystal-park-res-bot.onrender.com
codeAvailable: true
order: 2
---

## Description

This project stemmed from a personal problem, as many do. Parking reservations at my local ski mountain, Crystal, are often full — to get one, you have to refresh the page until a spot opens up and be quick enough to sign in and submit your information before it's gone.

It started as a single CLI script. It's since grown into a small full-stack web app: a Flask backend submits a Selenium bot that logs in, fuzzy-matches your license plate, and polls the calendar every 5 seconds until your requested date opens up — then completes the reservation automatically. Progress streams live to the browser over Server-Sent Events, and a "Stop Farming" button lets you cancel an in-progress run mid-poll. It's containerized with Docker and deployed live (see the button above). The original CLI script is still in the repo, unchanged, for anyone who'd rather run it directly.

## Code Sample

The polling loop is the heart of the bot — it matches the calendar day by a date-prefix XPath (to dodge timezone-offset mismatches) and checks a cancellation flag on every iteration so the "Stop Farming" button can interrupt a long-running poll cleanly:

```python
def poll_for_availability(driver, date_base, log, refresh_rate=5, cancel_event=None):
    while True:
        if cancel_event and cancel_event.is_set():
            raise Exception("Reservation cancelled by user.")
        try:
            calendar_day = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located(
                    (By.XPATH, f"//div[starts-with(@data-date, '{date_base}')]")
                )
            )
            actual_date = calendar_day.get_attribute("data-date")
            if "fc-unavailable" not in calendar_day.get_attribute("class"):
                log(f"Date {actual_date} is available! Clicking...", "success")
                calendar_day.click()
                break
        except TimeoutException:
            pass
        time.sleep(refresh_rate)
```

## Methods and Tools

1. **Web Automation:** Selenium, with native Selenium-Manager driver handling, for login, fuzzy license-plate matching, calendar navigation, and reservation checkout.
2. **Backend:** Flask, running the bot in a background thread per session so the web request returns immediately while polling continues.
3. **Live Progress:** Server-Sent Events (`EventSource` on the frontend) streaming bot status to the browser in real time, with keepalive frames to survive proxy timeouts.
4. **Cancellation:** a `threading.Event` checked inside the polling loop, flipped by the "Stop Farming" button.
5. **Deployment:** Docker (`python:3.11-slim` + headless Chromium) behind Gunicorn, hosted on Render with a `/health` check endpoint.

## Next Steps

1. Add notifications (email or SMS) so you don't need to keep the browser tab open watching the SSE stream.
2. Add automated tests around the polling/cancellation logic.
3. Add scheduling support so a reservation attempt can be queued for a future date without manual kickoff.
