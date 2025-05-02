"use client";

import { CandlestickSeries, type IChartApi, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

export default function LWCChart() {
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!container.current) return;

		const chart: IChartApi = createChart(container.current, {
			layout: {
				background: { color: "#0d1117" },
				textColor: "#fff",
			},
			grid: {
				vertLines: { color: "rgba(42, 46, 57, 0.5)" },
				horzLines: { color: "rgba(42, 46, 57, 0.5)" },
			},
			width: container.current.clientWidth,
			height: 400,
			timeScale: {
				timeVisible: true,
				secondsVisible: false,
				borderColor: "rgba(42, 46, 57, 0.5)",
			},
			rightPriceScale: {
				borderColor: "rgba(42, 46, 57, 0.5)",
			},
		});

		const candlestickSeries = chart.addSeries(CandlestickSeries, {
			upColor: "#26a69a", // Green for up candles
			downColor: "#ef5350", // Red for down candles
			borderVisible: false,
			wickUpColor: "#26a69a", // Green for upper wicks
			wickDownColor: "#ef5350", // Red for lower wicks
		});

		// Sample OHLC data (Open, High, Low, Close)
		const ohlcData = [
			{
				time: "2022-01-01",
				open: 0.000025,
				high: 0.000028,
				low: 0.000024,
				close: 0.000026,
			},
			{
				time: "2022-01-02",
				open: 0.000026,
				high: 0.000029,
				low: 0.000025,
				close: 0.000028,
			},
			{
				time: "2022-01-03",
				open: 0.000028,
				high: 0.000032,
				low: 0.000027,
				close: 0.000031,
			},
			{
				time: "2022-01-04",
				open: 0.000031,
				high: 0.000035,
				low: 0.00003,
				close: 0.000033,
			},
			{
				time: "2022-01-05",
				open: 0.000033,
				high: 0.000037,
				low: 0.000032,
				close: 0.000035,
			},
			{
				time: "2022-01-06",
				open: 0.000035,
				high: 0.00004,
				low: 0.000034,
				close: 0.000038,
			},
			{
				time: "2022-01-07",
				open: 0.000038,
				high: 0.000045,
				low: 0.000037,
				close: 0.000043,
			},
			{
				time: "2022-01-08",
				open: 0.000043,
				high: 0.000048,
				low: 0.000042,
				close: 0.000046,
			},
			{
				time: "2022-01-09",
				open: 0.000046,
				high: 0.00005,
				low: 0.000045,
				close: 0.000049,
			},
			{
				time: "2022-01-10",
				open: 0.000049,
				high: 0.000055,
				low: 0.000048,
				close: 0.000051,
			},
			{
				time: "2022-01-11",
				open: 0.000051,
				high: 0.000058,
				low: 0.00005,
				close: 0.000055,
			},
			{
				time: "2022-01-12",
				open: 0.000055,
				high: 0.00006,
				low: 0.000054,
				close: 0.000057,
			},
			{
				time: "2022-01-13",
				open: 0.000057,
				high: 0.000059,
				low: 0.00005,
				close: 0.000052,
			},
			{
				time: "2022-01-14",
				open: 0.000052,
				high: 0.000053,
				low: 0.000045,
				close: 0.000047,
			},
			{
				time: "2022-01-15",
				open: 0.000047,
				high: 0.000048,
				low: 0.000025,
				close: 0.000026,
			},
		];

		candlestickSeries.setData(ohlcData);

		// Add volume data if needed
		// const volumeSeries = chart.addHistogramSeries({
		//   color: '#26a69a',
		//   priceFormat: {
		//     type: 'volume',
		//   },
		//   priceScaleId: '',
		// });

		// Add price line at current price
		candlestickSeries.createPriceLine({
			price: 0.000026,
			color: "#4CAF50",
			lineWidth: 1,
			lineStyle: 2, // dashed
			axisLabelVisible: true,
			title: "Current Price",
		});

		chart.timeScale().fitContent();

		const resize = () =>
			chart.applyOptions({ width: container.current?.clientWidth });
		window.addEventListener("resize", resize);
		return () => {
			window.removeEventListener("resize", resize);
			chart.remove();
		};
	}, []);

	return <div ref={container} className="w-full h-[400px]" />;
}
