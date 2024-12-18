import React from "react";
import { Outlet } from "react-router-dom";
import "./index.css";
import { useTheme } from "antd-style";
export default function Layout() {
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: theme.colorBgLayout,
      }}
    >
      <Outlet style={{ flex: 1 }} />

      <div
        dangerouslySetInnerHTML={{
          __html: `<footer
        style="
        text-align: center;
        font-size: 10px;
        height: 24px;
        padding: 8px;
        box-sizing: border-box;
      "
      >
        <a
          style="margin-right: 1em; color: #999; text-decoration: none"
          href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802044759"
          target="_blank"
        >
          <img
            style="width: 10px"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEvElEQVR4AX3Ba2wTBQDA8f9dr9fra2u3rl3pCOEldG6COIIxQ2R+QIhMgRgjMTH4iMb4CD4wGg0sIkGNRKKQIMZEpzGoiSQMIcOM+Mii8AFkCOosKGv3bPe4tnd93PW8mJoQov5+Av/DssYbtcSpzpPHTz9S1A151ZolB+tbbzwsCAuT/AeBf2Hp36/+rffEY/3HLnZaekIZKio4gkHmhBT0tNto75h/JL5+0weC0trDNRxcw7IspW/fjsEnt/Vfv3iuKrX4RG63JrnZXyS8qpmZ+oD44hN98dnyhc3dved2d3V1mVzFwVUsK9NUPPP6l8/tujSn854oW2qH0d8+j654KBUdZLcf5dbOILX3b6D7wCD3rEwv2fHOvi+7uvYaVDmoKlp/xFM9uy6u23xxXtOyKK8tPM/g+2OItQqGZeH0uDCyBr8fTrDugQjfFhaxZ/vxReuWZR7a9sKGnjffPZ7BJlIla72+I7965FMjN7G2TSN3dgrxz2nEgIKcMSh8P4xzbgglr5H+sJ+Nayr0JeJ0f1eK1op5N1UitsxPJ5vMU9/uqQhukDRqsiOooyZSpYw1qSMu8CK31SGM5JCxSF/WiNWVQRCYygk4G1x7LH16LjYRW/LSiU3l1HB70CeD4cKKRgm1x8hjkbsljHnfXHxdK/A+vQyxwUP4pjB5rQSWRTTsheTA6szIdw9iE7F5vYG4mi0xr6EE7jp6f5SROkJk1s/DTKkI51S0oynKl6eQn7+Nuq1tfPHROOBlaatMPjFO4UqiCZuIzZwcXq9OCbQ05Ym1udj3sZtvdg+ydHmMWo8f7ecMlfEChYEM/tQU518dYO9HTsJLArTGcqRTOsbUYDs2EZsoaYGsKlAzkeDeNRXMso9yT4q6Q6cRYzKlBieVsJNQRxONfb+TPvgTWtnBpk4ZfyZBVhVx+B1ObBI2t2f21+KioU4zMostK3T2zGpgfypOeegC9elfEAMe9J8zZBdESAWjfCa6oCbAlpsnMfyzCFxv4Q7OPopN4m9C2FJNhhMztMSH2PlcCy9vW0lPrgWyZTr1SeoCIp9/5SOPBwjyzOMeli9IMjxoQEHHKqtLsEnYpIDRZvjDlEfLJMcv8FS7zMYTbvqOFflFbOGO5j+IuqcwjjRRmtKZvdjLS3cMM9Z/Ca3sQgm5kIKuxdgkbMEb7nzA1N76RB8to6bdqIdOMP/uG4k/7APzDGZGJDeu0711AuaEIPknlw9fQPfX45vnx9XoxRdevhGbA9vOXe8NvLH/04RpDNzuCklKfsxkZkJFikbIj0F2pojp9WEqXkp5GO4fwlD81K24Dkuqyfjnd9zlDq0/iU2iKpvOpwqjsq5EKrWRjoWYM3nMrAoeGYccQHYLlKZz5JOTKHPqUZoiFKc1CinVKsRy/EOkymn98GJ4WaDRGWykOGNSMSUqpkhhIgtWhVJmhtzgOILDCYJAYSSN0y0SWRkLuXzao1SJVHld7Xdndd+7WjKVlx0qNeEKTqGALJRxFGewdB3/4gZqFgQQZQ2p1oUQjFwxpBte8YXH7qVK4Bq/Hng2pE6Mry0YyVWxeKTZVCs+Jeioc7oVNJUr7nBAk0LNZzOJ0a8XnTN7hR07KlzlL+zRCHofTKTcAAAAAElFTkSuQmCC"
            alt=""
          />
          <span>京公网安备11010802044759号</span>
        </a>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          style="color: #999; text-decoration: none"
        >
          京ICP备2024080203号
        </a>
      </footer>`,
        }}
      ></div>
    </div>
  );
}
