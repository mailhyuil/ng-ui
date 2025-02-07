import { Component, computed, input } from "@angular/core";
import { YouTubePlayer } from "@angular/youtube-player";

@Component({
  selector: "app-youtube-thumbnail",
  templateUrl: "./youtube-thumbnail.component.html",
  styleUrls: ["./youtube-thumbnail.component.scss"],
  standalone: true,
  imports: [YouTubePlayer],
  host: {
    class: "pointer-events-none",
  },
})
export class YoutubeThumbnailComponent {
  url = input.required<string>();
  videoId = computed(() => {
    const url = new URL(this.url());
    const v = url.searchParams.get("v");
    const videoId = v || url.pathname.split("/").pop();
    if (!videoId) return;
    return videoId;
  });
  width = input<number>();
  height = input<number>();
  playerVars = input<YT.PlayerVars>({
    controls: 0,
    showinfo: 0,
    autohide: 1,
  });
}
