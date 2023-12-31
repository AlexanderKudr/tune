import asyncio
import os
import shutil
from datetime import datetime, timedelta

from utils.functions import download_audio
from models.audio import ListenTemporal


def audio_exists(folder_name: str) -> bool:
    return os.path.exists(folder_name)


async def delete_temp_audio_after_delay(folder_name: str, total_duration: int) -> None:
    await asyncio.sleep(total_duration)

    shutil.rmtree(folder_name)


def listen_temporal(payload: ListenTemporal):
    duration = datetime.strptime(payload.duration, "%H:%M:%S")

    total_duration = timedelta(
        hours=duration.hour, minutes=duration.minute, seconds=duration.second
    ).total_seconds()

    if not audio_exists(f"audio/temporal/{payload.title}"):
        download_audio(payload.url, "temporal")

        folder_path = "audio/temporal"

        asyncio.create_task(
            delete_temp_audio_after_delay(
                f"{folder_path}/{payload.title}", total_duration + (10 * 60)
            )
        )

        return {"message": "Song downloaded successfully"}

    return {"message": "Song already exists"}
