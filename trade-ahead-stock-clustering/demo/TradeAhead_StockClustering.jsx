import { useState, useMemo, useCallback } from "react";

const D = {"s":[["AAL","American Airlines Group","Industrials",42.3,10.0,1.69,135.0,11.39,3.7,-8.8,2,2,1.23,-0.92],["ABBV","AbbVie","Health Care",59.2,8.3,2.2,130.0,3.15,18.8,-8.8,2,2,0.13,-1.02],["ABT","Abbott Laboratories","Health Care",44.9,11.3,1.27,21.0,2.94,15.3,-0.4,2,2,1.07,-0.75],["ADBE","Adobe Systems Inc","Information Technology",93.9,14.0,1.36,9.0,1.26,74.6,4.2,2,2,0.13,1.18],["ADI","Analog Devices, Inc.","Information Technology",55.3,-1.8,1.7,14.0,0.31,178.5,1.1,4,2,-0.58,1.11],["ADM","Archer-Daniels-Midland Co","Consumer Staples",36.7,-12.0,1.52,10.0,2.99,12.3,7.5,2,2,-0.2,-0.56],["ADS","Alliance Data Systems","Information Technology",276.6,6.2,1.12,30.0,8.91,31.0,129.1,1,5,1.02,4.82],["AEE","Ameren Corp","Utilities",43.2,2.2,1.12,9.0,2.6,16.6,-0.7,2,2,0.09,-0.37],["AEP","American Electric Power","Utilities",58.3,2.4,1.07,11.0,3.13,18.5,-3.0,2,2,0.41,-0.51],["AFL","AFLAC Inc","Financials",59.9,3.0,1.05,14.0,5.88,10.2,-1.9,2,2,0.82,-0.19],["AIG","American International Group","Financials",62.0,8.4,1.11,2.0,1.69,36.7,-4.3,2,2,0.69,-0.37],["AIV","Apartment Investment & Mgmt","Real Estate",40.0,7.6,1.16,15.0,1.52,26.3,-1.3,2,2,-0.01,-0.1],["AIZ","Assurant Inc","Financials",80.5,1.9,1.11,3.0,2.08,38.7,-4.1,2,2,-0.0,0.34],["AJG","Arthur J. Gallagher & Co.","Financials",40.9,-0.6,1.05,10.0,2.07,19.8,-9.9,2,2,0.03,-0.3],["AKAM","Akamai Technologies Inc","Information Technology",52.6,-23.8,1.38,10.0,1.8,29.2,4.3,2,2,-0.67,0.31],["ALB","Albemarle Corp","Materials",56.0,26.5,1.97,10.0,3.01,18.6,-13.6,2,2,-0.05,-0.25],["ALK","Alaska Air Group Inc","Industrials",80.5,2.1,1.77,35.0,6.61,12.2,-1.1,2,2,-0.02,0.18],["ALL","Allstate Corp","Financials",62.1,6.6,1.05,11.0,5.12,12.1,-4.3,2,2,0.8,-0.15],["ALLE","Allegion","Industrials",65.9,13.8,1.28,601.0,1.6,41.2,-0.9,2,2,-1.84,-0.06],["ALXN","Alexion Pharmaceuticals","Health Care",190.8,22.3,2.02,2.0,0.68,280.5,-14.2,1,0,-1.11,3.42],["AMAT","Applied Materials Inc","Information Technology",18.7,26.8,1.46,18.0,1.13,16.5,3.9,2,2,0.72,0.03],["AME","AMETEK Inc","Industrials",53.6,2.2,1.09,18.0,2.46,21.8,-4.5,2,2,0.08,-0.3],["AMG","Affiliated Managers Group","Financials",159.8,-6.6,2.09,18.0,9.49,16.8,-31.0,2,2,-0.14,-0.08],["AMGN","Amgen Inc","Health Care",162.3,17.2,1.63,25.0,9.15,17.7,24.0,4,2,2.03,2.08],["AMP","Ameriprise Financial","Financials",106.4,-2.4,1.22,22.0,8.6,12.4,-13.4,2,2,0.6,-0.14],["AMT","American Tower Corp A","Real Estate",96.9,10.2,1.17,10.0,1.42,68.3,-20.8,2,2,0.08,-0.07],["AMZN","Amazon.com Inc","Consumer Discretionary",675.9,32.3,1.46,4.0,1.28,528.0,3.9,1,0,-0.65,8.44],["AN","AutoNation Inc","Consumer Discretionary",59.7,2.4,1.48,19.0,3.93,15.2,-8.0,2,2,-0.14,-0.41],["ANTM","Anthem Inc.","Health Care",139.4,-0.6,1.51,11.0,9.73,14.3,-31.0,2,2,0.75,-0.37],["AON","Aon plc","Financials",92.2,3.9,1.11,23.0,4.93,18.7,-7.8,2,2,0.54,0.07],["APA","Apache Corporation","Energy",44.5,11.4,2.41,917.0,-61.2,93.1,5.0,0,7,-11.73,0.05],["APC","Anadarko Petroleum Corp","Energy",48.6,-20.8,2.44,52.0,-13.18,93.1,-12.9,0,2,-4.09,-0.79],["APH","Amphenol Corp","Information Technology",52.2,2.7,1.01,24.0,2.47,21.1,8.2,2,2,0.32,0.52],["ARNC","Arconic Inc","Industrials",7.4,1.6,2.59,3.0,-0.31,18.7,2.6,2,2,-1.17,-0.67],["ATVI","Activision Blizzard","Information Technology",38.7,23.3,1.89,11.0,1.21,32.0,0.3,2,2,-0.01,-0.13],["AVB","AvalonBay Communities, Inc.","Real Estate",184.1,4.9,1.13,8.0,5.54,33.2,-3.1,2,2,0.56,0.81],["AVGO","Broadcom","Information Technology",145.1,17.9,1.85,29.0,2.86,18.2,4.0,2,2,0.51,0.81],["AWK","American Water Works Company","Utilities",59.8,8.6,1.17,9.0,2.66,22.5,-4.9,2,2,0.16,-0.24],["AXP","American Express Co","Financials",69.6,-6.2,0.9,25.0,3.9,10.3,-0.6,2,2,0.93,-0.46],["BA","Boeing Company","Industrials",144.6,10.1,1.16,82.0,7.52,19.2,22.0,2,2,1.29,0.57],["BAC","Bank of America Corp","Financials",16.8,8.4,1.42,6.0,4.18,13.0,-0.9,4,1,2.69,0.03],["BAX","Baxter International Inc.","Health Care",38.2,16.7,1.2,11.0,1.78,21.4,8.6,2,2,0.48,0.3],["BBT","BB&T Corporation","Financials",37.8,5.9,1.08,8.0,2.59,14.6,-0.9,2,2,0.64,-0.31],["BCR","Bard (C.R.) Inc.","Health Care",189.4,1.5,1.39,9.0,1.8,105.2,-4.1,2,2,-0.38,1.48],["BHI","Baker Hughes Inc","Energy",46.2,-12.3,2.56,12.0,-4.49,93.1,13.5,0,2,-2.4,0.7],["BIIB","BIOGEN IDEC Inc.","Health Care",306.4,4.9,1.83,38.0,15.38,19.9,0.2,2,2,1.49,1.91],["BK","The Bank of New York Mellon","Financials",41.2,5.4,1.2,8.0,2.73,15.1,-3.3,2,2,0.76,-0.69],["BLL","Ball Corp","Materials",72.7,16.5,1.39,22.0,2.05,35.5,-3.9,2,2,0.03,0.14],["BMY","Bristol-Myers Squibb","Health Care",68.8,16.1,1.5,11.0,0.94,73.2,0.6,2,2,0.26,-0.26],["BSX","Boston Scientific","Health Care",18.4,11.8,1.49,4.0,-0.18,31.5,-3.9,2,2,-0.11,-0.82],["BWA","BorgWarner","Consumer Discretionary",43.2,3.5,2.06,17.0,2.72,15.9,1.0,2,2,-0.58,-0.23],["BXP","Boston Properties","Real Estate",127.5,7.2,1.09,10.0,3.79,33.7,-1.3,2,2,0.37,0.45],["C","Citigroup Inc.","Financials",51.8,4.7,1.26,8.0,5.41,9.6,-1.2,3,2,3.12,-3.03],["CAT","Caterpillar Inc.","Industrials",68.0,3.6,1.49,17.0,3.54,19.2,6.3,2,2,0.29,-0.31],["CB","Chubb Limited","Financials",116.8,13.2,0.94,10.0,8.71,13.4,-17.5,2,2,1.48,0.13],["CBG","CBRE Group","Real Estate",34.6,8.2,1.3,20.0,1.64,21.1,-3.4,2,2,-0.04,-0.45],["CCI","Crown Castle Intl Corp","Real Estate",86.4,9.6,0.96,21.0,4.44,19.5,-10.7,2,2,0.7,-0.23],["CCL","Carnival Corp.","Consumer Discretionary",54.5,8.9,1.35,7.0,2.26,24.1,-7.5,2,2,0.35,-0.52],["CELG","Celgene Corp.","Health Care",119.8,8.4,2.0,27.0,2.02,59.3,-4.3,4,2,0.01,1.38],["CF","CF Industries Holdings Inc","Materials",40.8,-9.3,2.37,16.0,2.97,13.7,-0.4,2,2,-1.09,-0.57],["CFG","Citizens Financial Group","Financials",26.2,10.3,1.19,4.0,1.55,16.9,-0.1,2,2,0.31,-0.21],["CHD","Church & Dwight","Consumer Staples",42.4,1.0,0.93,20.0,3.13,13.6,-9.4,2,2,0.17,-0.52],["CHK","Chesapeake Energy","Energy",4.5,-38.1,4.56,687.0,-22.43,28.4,-1.8,0,6,-9.43,-1.46],["CHRW","C. H. Robinson Worldwide","Industrials",62.0,-9.0,1.19,44.0,3.52,17.6,1.1,2,2,-0.27,-0.34],["CHTR","Charter Communications","Consumer Discretionary",183.1,3.6,1.7,589.0,-2.43,20.8,-76.1,2,2,-2.47,-1.87],["CI","CIGNA Corp.","Health Care",146.3,8.7,1.59,17.0,8.17,17.9,-8.8,2,2,0.73,0.45],["CINF","Cincinnati Financial","Financials",59.2,9.8,0.94,10.0,3.87,15.3,-4.3,2,2,0.58,0.09],["CL","Colgate-Palmolive","Consumer Staples",66.6,4.8,0.9,463.0,1.53,43.5,-0.5,2,2,-0.99,-0.6],["CMA","Comerica Inc.","Financials",41.8,1.9,1.56,7.0,2.93,14.3,-0.1,2,2,-0.15,-0.01],["CME","CME Group Inc.","Financials",90.6,-2.4,1.32,6.0,3.71,24.4,-58.6,2,2,0.13,-1.31],["CMG","Chipotle Mexican Grill","Consumer Discretionary",479.9,-33.1,2.47,22.0,15.3,31.4,17.2,1,2,0.11,3.57],["CMI","Cummins Inc.","Industrials",88.0,-18.9,1.47,19.0,7.86,11.2,21.4,2,2,-0.06,0.31],["CMS","CMS Energy","Utilities",36.1,1.9,1.04,14.0,1.9,19.0,0.1,2,2,0.04,-0.43],["CNC","Centene Corporation","Health Care",65.8,21.7,2.3,16.0,2.99,22.0,-1.3,2,2,-0.31,0.46],["CNP","CenterPoint Energy","Utilities",18.4,1.4,1.39,20.0,-1.61,17.3,0.5,2,2,-0.63,-0.5],["COF","Capital One Financial","Financials",72.2,-0.6,1.36,9.0,7.15,10.1,-0.7,2,2,0.9,-0.17],["COG","Cabot Oil & Gas","Energy",17.7,-20.1,3.06,6.0,-0.28,93.1,-0.2,0,2,-2.52,-0.24],["COO","The Cooper Companies","Health Care",134.2,-9.7,1.56,8.0,1.79,34.0,0.9,2,2,-0.57,0.19],["CSX","CSX Corp.","Industrials",26.0,-4.3,1.63,17.0,2.0,13.0,0.9,2,2,-0.09,-0.75],["CTL","CenturyLink Inc","Telecommunications Services",25.2,0.2,1.52,6.0,1.58,15.9,-13.4,2,2,-0.26,-1.04],["CTSH","Cognizant Technology Solutio","Information Technology",60.0,-4.7,1.34,17.0,2.67,22.5,7.1,2,2,0.14,0.27],["CTXS","Citrix Systems","Information Technology",75.7,9.0,1.97,16.0,2.01,37.6,-1.8,2,2,-0.5,0.31],["CVS","CVS Health","Consumer Staples",97.8,1.3,1.49,14.0,4.66,21.0,-7.0,2,2,0.84,-0.81],["CVX","Chevron Corp.","Energy",90.0,12.8,1.75,3.0,2.46,36.6,4.8,2,2,0.81,-0.55],["CXO","Concho Resources","Energy",92.9,-2.7,2.69,1.0,0.54,172.0,5.7,0,2,-2.01,1.57],["D","Dominion Resources","Utilities",67.6,-4.0,0.89,15.0,3.21,21.1,-7.6,2,2,0.41,-0.71],["DAL","Delta Air Lines","Industrials",50.7,13.4,1.44,42.0,5.68,8.9,-16.7,2,2,0.94,-0.99],["DD","Du Pont (E.I.)","Materials",66.6,37.5,1.58,20.0,2.17,30.7,3.3,2,2,0.84,0.24],["DE","Deere & Co.","Industrials",76.3,4.0,1.55,29.0,4.03,14.8,6.3,2,2,0.19,-0.09],["DFS","Discover Financial Services","Financials",53.6,3.7,1.16,20.0,5.14,10.4,-0.4,2,2,0.69,-0.01],["DGX","Quest Diagnostics","Health Care",71.1,15.7,1.38,15.0,4.92,14.5,-4.6,2,2,0.41,-0.02],["DHR","Danaher Corp.","Industrials",70.4,8.9,1.19,14.0,4.81,14.6,-13.8,2,2,0.83,-0.93],["DIS","The Walt Disney Company","Consumer Discretionary",105.1,2.0,1.19,19.0,4.95,21.2,-4.0,2,2,1.69,-1.02],["DISCA","Discovery Communications-A","Consumer Discretionary",26.7,2.0,1.69,19.0,-2.43,20.8,-76.1,2,2,-0.82,-2.43],["DISCK","Discovery Communications-C","Consumer Discretionary",25.2,3.6,1.81,19.0,-2.43,20.8,-76.1,2,2,-0.88,-2.41],["DLPH","Delphi Automotive","Consumer Discretionary",85.7,12.1,1.44,64.0,5.08,16.9,-0.7,2,2,0.29,-0.01],["DLR","Digital Realty Trust","Real Estate",75.6,15.6,1.07,7.0,1.56,48.5,-7.5,2,2,0.23,0.22],["DNB","Dun & Bradstreet","Industrials",103.9,-1.2,1.34,15.0,4.68,22.2,-11.9,2,2,-0.02,-0.04],["DOV","Dover Corp.","Industrials",61.3,7.0,1.51,24.0,5.52,11.1,-2.3,2,2,0.16,-0.15],["DPS","Dr Pepper Snapple Group","Consumer Staples",93.2,18.0,1.15,35.0,4.0,23.3,-12.7,2,2,0.57,0.15],["DUK","Duke Energy","Utilities",71.4,-0.8,1.1,7.0,4.05,17.6,-4.4,2,2,0.57,-0.75],["DVA","DaVita Inc.","Health Care",69.7,-3.6,1.21,6.0,1.27,54.9,2.0,2,2,-0.32,0.36],["DVN","Devon Energy Corp.","Energy",32.0,-15.5,2.92,205.0,-35.55,93.1,1.8,0,2,-7.39,0.07],["EBAY","eBay Inc.","Information Technology",27.5,12.2,1.41,26.0,1.43,19.2,4.6,2,2,0.48,-0.03],["ECL","Ecolab Inc.","Materials",114.4,3.8,1.08,15.0,3.38,33.8,-14.9,2,2,0.28,-0.24],["ED","Consolidated Edison","Utilities",64.3,-4.0,1.07,9.0,4.07,15.8,-3.0,2,2,0.23,-0.4],["EFX","Equifax Inc.","Industrials",111.4,14.5,1.08,19.0,3.61,30.9,-8.1,2,2,0.44,0.23],["EIX","Edison Int'l","Utilities",59.2,-6.1,0.93,10.0,3.13,18.9,-6.4,2,2,0.17,-0.66],["EMN","Eastman Chemical","Materials",67.5,3.7,1.4,22.0,5.71,11.8,-12.3,2,2,0.18,-0.43],["EOG","EOG Resources","Energy",70.8,-4.1,1.94,35.0,-8.29,93.1,1.4,0,2,-2.47,0.32],["EQIX","Equinix","Real Estate",302.4,10.0,1.31,7.0,3.25,93.0,23.9,1,2,0.39,3.35],["EQR","Equity Residential","Real Estate",81.6,8.0,1.06,8.0,2.37,34.4,-1.3,2,2,0.33,0.11],["EQT","EQT Corporation","Energy",52.1,-21.3,2.36,2.0,0.56,93.1,9.6,0,2,-1.74,1.04],["ES","Eversource Energy","Utilities",51.1,0.7,1.23,8.0,2.77,18.4,-1.2,2,2,0.03,-0.44],["ESS","Essex Property Trust, Inc.","Real Estate",239.4,6.8,1.12,4.0,3.5,68.4,-3.1,2,2,0.33,1.48],["ETFC","E*Trade","Financials",29.6,12.7,1.45,5.0,0.92,32.2,-0.6,2,2,-0.08,0.16],["ETN","Eaton Corporation","Industrials",52.0,1.2,1.52,13.0,4.25,12.2,-8.6,2,2,0.14,-0.75],["ETR","Entergy Corp.","Utilities",68.4,4.9,1.22,2.0,-0.99,18.5,6.2,2,2,-0.23,0.1],["EW","Edwards Lifesciences","Health Care",79.0,11.6,1.67,20.0,2.3,34.3,6.3,2,2,0.04,1.24],["EXC","Exelon Corp.","Utilities",27.8,-6.4,1.35,9.0,2.69,17.3,-1.7,2,2,0.06,-0.22],["EXPD","Expeditors Int'l","Industrials",45.1,-4.4,1.06,27.0,2.42,18.6,6.0,2,2,-0.06,0.01],["EXPE","Expedia Inc.","Consumer Discretionary",124.3,4.9,1.58,16.0,5.87,21.2,-44.1,2,2,0.15,-0.72],["EXR","Extra Space Storage","Real Estate",88.2,13.9,1.19,19.0,1.58,55.8,-14.2,2,2,0.08,0.13],["F","Ford Motor","Consumer Discretionary",14.1,2.4,1.15,26.0,1.86,7.6,5.1,3,2,1.89,-2.2],["FAST","Fastenal Co","Industrials",40.8,11.0,1.41,29.0,1.77,23.1,4.4,2,2,-0.06,-0.02],["FB","Facebook","Information Technology",104.7,16.2,1.32,8.0,1.31,79.9,5.9,4,3,1.95,3.06],["FBHS","Fortune Brands Home & Securi","Industrials",55.5,16.8,1.35,13.0,1.97,28.2,-2.1,2,2,0.12,0.1],["FCX","Freeport-McMoran Cp & Gld","Materials",6.8,-31.7,3.8,155.0,-11.31,22.8,2.9,0,2,-5.71,-0.87],["FE","FirstEnergy Corp","Utilities",31.7,1.2,1.24,5.0,1.37,23.2,-6.1,2,2,-0.13,-0.69],["FIS","Fidelity National Info","Information Technology",60.6,-10.6,1.15,7.0,2.22,27.3,-19.1,2,2,-0.25,-0.83],["FISV","Fiserv Inc","Information Technology",91.5,5.2,0.9,27.0,3.04,30.1,-8.0,2,2,0.32,-0.13],["FLIR","FLIR Systems","Information Technology",28.1,0.2,1.76,15.0,1.73,16.2,4.0,2,2,-0.55,-0.06],["FLR","Fluor Corp.","Industrials",47.2,10.8,1.77,14.0,2.85,16.6,15.0,2,2,-0.17,0.5],["FLS","Flowserve Corporation","Industrials",42.1,2.2,1.78,16.0,2.01,20.9,6.7,2,2,-0.54,-0.02],["FMC","FMC Corporation","Materials",39.1,15.1,2.18,26.0,3.66,10.7,5.1,2,2,-0.39,0.01],["FRT","Federal Realty Investment Tr","Real Estate",146.1,6.8,1.24,13.0,3.04,48.1,-4.0,2,2,0.1,0.72],["FSLR","First Solar Inc","Information Technology",66.0,55.1,2.08,10.0,5.42,12.2,22.6,2,2,1.01,1.97],["FTR","Frontier Communications","Telecommunications Services",4.7,-2.3,2.03,3.0,-0.29,14.5,10.5,4,2,-0.47,1.21],["GD","General Dynamics","Industrials",137.4,-0.5,0.94,28.0,9.23,14.9,4.2,2,2,1.09,0.15],["GGP","General Growth Properties","Real Estate",27.2,4.2,1.39,17.0,3.04,47.4,-4.0,2,2,-0.13,-0.13],["GILD","Gilead Sciences","Health Care",101.2,2.7,1.49,98.0,12.37,8.2,3.2,4,2,3.21,-0.73],["GLW","Corning Inc.","Information Technology",18.3,6.6,1.58,7.0,1.02,17.9,3.6,2,2,0.19,-0.37],["GM","General Motors","Consumer Discretionary",34.0,12.3,1.34,24.0,6.11,5.6,-4.9,2,2,1.89,-1.72],["GPC","Genuine Parts","Consumer Discretionary",85.9,4.0,1.18,22.0,4.65,18.5,7.2,2,2,0.26,0.18],["GRMN","Garmin Ltd.","Consumer Discretionary",37.2,3.4,1.67,14.0,2.39,15.6,5.8,2,2,-0.26,0.19],["GT","Goodyear Tire & Rubber","Consumer Discretionary",32.7,10.4,1.52,8.0,1.14,28.7,3.8,2,2,-0.23,-0.09],["GWW","Grainger (W.W.) Inc.","Industrials",202.6,-5.3,1.35,34.0,11.69,17.3,12.1,2,2,0.64,1.11],["HAL","Halliburton Co.","Energy",34.0,-5.1,1.97,4.0,-0.79,93.1,17.3,4,2,-1.02,1.5],["HAS","Hasbro Inc.","Consumer Discretionary",67.4,-7.1,1.58,27.0,3.61,18.7,12.1,2,2,-0.38,0.36],["HBAN","Huntington Bancshares","Financials",11.1,4.1,1.34,11.0,0.82,13.5,-0.1,2,2,0.02,-0.57],["HCA","HCA Holdings","Health Care",67.6,-12.5,1.91,28.0,5.14,13.2,-7.3,2,2,-0.4,-0.72],["HCN","Welltower Inc.","Real Estate",68.0,0.0,1.34,6.0,2.35,28.9,-3.7,2,2,-0.06,-0.19],["HCP","HCP Inc.","Real Estate",34.8,2.2,1.28,6.0,-1.21,33.7,-1.3,2,2,-0.47,-0.28],["HES","Hess Corporation","Energy",48.5,-4.6,2.4,16.0,-10.78,28.4,6.3,0,2,-2.47,0.09],["HIG","Hartford Financial Svc.Gp.","Financials",43.5,-5.0,1.15,10.0,4.05,10.7,-4.3,2,2,0.3,-0.43],["HOG","Harley-Davidson","Consumer Discretionary",45.4,-17.2,1.56,41.0,3.71,12.2,6.1,2,2,-0.65,-0.44],["HON","Honeywell Int'l Inc.","Industrials",103.6,9.3,1.1,26.0,6.11,17.0,-3.7,2,2,1.26,-0.4],["HPE","Hewlett Packard Enterprise","Information Technology",15.2,-17.8,3.4,7.0,1.8,25.3,4.0,0,2,-1.71,-0.16],["HPQ","HP Inc.","Information Technology",11.8,2.2,2.37,16.0,1.8,25.3,4.0,2,2,-0.38,-0.52],["HRL","Hormel Foods Corp.","Consumer Staples",39.5,24.5,1.08,17.0,3.28,24.1,-2.0,2,2,0.63,0.06],["HSIC","Henry Schein","Health Care",158.2,18.3,1.01,17.0,5.78,27.4,5.9,2,2,0.85,0.93],["HST","Host Hotels & Resorts","Real Estate",15.3,-3.2,1.59,8.0,0.22,69.7,-0.1,2,2,-0.25,-1.09],["HSY","The Hershey Company","Consumer Staples",89.3,-3.3,1.19,51.0,3.28,24.1,-2.0,2,2,-0.14,-0.14],["HUM","Humana Inc.","Health Care",178.5,-0.1,1.62,12.0,8.54,20.9,-8.8,2,2,0.47,0.65],["IBM","International Business Machi","Information Technology",137.6,-5.3,1.08,92.0,13.48,10.2,4.9,2,2,2.54,-0.74],["IDXX","IDEXX Laboratories","Health Care",72.9,-1.6,1.47,228.0,2.07,35.2,-1.0,2,2,-1.09,-0.07],["IFF","Intl Flavors & Fragrances","Materials",119.6,15.0,1.15,26.0,5.19,23.1,5.0,2,2,0.55,0.64],["INTC","Intel Corp.","Information Technology",34.5,14.0,1.23,19.0,2.41,14.3,4.0,4,1,3.17,-1.4],["IP","International Paper","Materials",37.7,-0.0,1.3,24.0,2.25,16.8,6.1,2,2,-0.09,-0.38],["IPG","Interpublic Group","Consumer Discretionary",23.3,21.8,1.14,23.0,1.11,21.0,0.3,2,2,0.33,-0.23],["IRM","Iron Mountain Incorporated","Real Estate",27.0,-13.1,1.3,24.0,0.58,46.6,-2.8,2,2,-0.84,-0.52],["ISRG","Intuitive Surgical Inc.","Health Care",546.2,18.7,1.13,14.0,15.87,34.4,42.6,1,2,2.58,5.68],["ITW","Illinois Tool Works","Industrials",92.7,12.8,1.14,36.0,5.16,18.0,7.6,2,2,0.81,0.58],["IVZ","Invesco Ltd.","Financials",33.5,7.1,1.58,12.0,2.26,14.8,4.2,2,2,-0.03,-0.11],["JBHT","J. B. Hunt Transport Service","Industrials",73.4,3.0,1.22,33.0,3.69,19.9,2.8,2,2,0.01,-0.03],["JEC","Jacobs Engineering Group","Industrials",42.0,11.5,1.73,7.0,2.42,17.3,6.3,2,2,-0.22,0.07],["JNPR","Juniper Networks","Information Technology",27.6,7.4,1.84,14.0,1.62,17.0,2.8,2,2,-0.32,-0.02],["JPM","JPMorgan Chase & Co.","Financials",66.0,8.0,1.13,10.0,6.05,10.9,-1.9,3,2,4.58,-3.47],["KIM","Kimco Realty","Real Estate",26.5,8.7,1.22,18.0,2.01,13.2,-1.3,2,2,0.19,-0.42],["KMB","Kimberly-Clark","Consumer Staples",127.3,17.5,0.87,582.0,2.78,45.8,-2.5,2,2,-1.06,0.07],["KMI","Kinder Morgan","Energy",14.9,-47.1,3.14,1.0,0.1,149.2,-1.9,0,2,-2.82,-1.14],["KO","Coca Cola Company","Consumer Staples",43.0,6.8,0.89,29.0,1.69,25.4,-1.5,3,2,2.16,-2.4],["KSU","Kansas City Southern","Industrials",74.7,-18.4,2.07,12.0,4.41,16.9,-2.0,2,2,-0.95,-0.37],["LEG","Leggett & Platt","Industrials",42.0,2.0,1.2,30.0,2.31,18.2,2.9,2,2,-0.12,-0.17],["LEN","Lennar Corp.","Consumer Discretionary",48.9,1.7,1.57,14.0,3.87,12.6,-0.3,2,2,-0.12,-0.28],["LH","Laboratory Corp. of America","Health Care",123.6,14.2,1.6,9.0,5.03,15.9,-1.3,2,2,0.34,0.51],["LKQ","LKQ Corporation","Consumer Discretionary",29.6,4.4,1.43,14.0,3.03,20.8,-0.9,2,2,-0.15,-0.35],["LLL","L-3 Communications Holdings","Industrials",119.5,14.5,1.51,6.0,-2.97,17.3,14.3,2,2,-0.35,0.61],["LLY","Lilly (Eli) & Co.","Health Care",84.3,0.8,1.44,17.0,2.27,37.1,-0.7,2,2,0.23,-0.31],["LMT","Lockheed Martin Corp.","Industrials",217.1,5.3,0.9,116.0,11.62,18.7,-10.9,2,2,1.37,0.35],["LNT","Alliant Energy Corp","Utilities",31.2,6.6,1.12,10.0,3.36,9.3,-4.6,2,2,0.18,-0.51],["LUK","Leucadia National Corp.","Financials",17.4,-14.3,1.55,2.0,0.74,23.5,19.8,2,2,-0.77,-0.04],["LUV","Southwest Airlines","Industrials",43.1,13.9,1.54,30.0,3.3,13.0,-5.1,2,2,0.4,-0.47],["LVLT","Level 3 Communications","Telecommunications Services",54.4,24.7,1.46,34.0,9.71,5.6,-2.2,2,2,1.34,0.07],["LYB","LyondellBasell","Materials",86.9,2.6,1.61,68.0,9.62,9.0,10.3,2,2,0.8,0.06],["MA","Mastercard Inc.","Information Technology",97.4,7.5,1.1,63.0,3.36,29.0,3.5,2,2,0.93,0.09],["MAA","Mid-America Apartments","Real Estate",90.8,10.6,1.18,12.0,4.41,20.6,-3.1,2,2,0.39,0.26],["MAC","Macerich","Real Estate",80.7,4.2,1.17,10.0,3.08,26.2,-4.0,2,2,0.14,0.05],["MAR","Marriott Int'l.","Consumer Discretionary",67.0,-2.0,1.64,24.0,3.22,20.8,-12.4,2,2,-0.35,-0.6],["MAS","Masco Corp.","Industrials",28.3,11.6,1.43,263.0,1.03,27.5,2.2,2,2,-0.87,-0.19],["MAT","Mattel Inc.","Consumer Discretionary",27.2,30.6,1.92,14.0,1.08,25.2,4.5,2,2,-0.01,0.3],["MCD","McDonald's Corp.","Consumer Discretionary",118.1,19.9,0.73,64.0,4.82,24.5,7.1,4,2,1.9,1.32],["MCO","Moody's Corp","Financials",100.3,2.3,1.27,167.0,4.7,21.3,8.6,2,2,-0.06,0.85],["MDLZ","Mondelez International","Consumer Staples",44.8,6.1,1.32,26.0,4.49,10.0,-12.8,2,2,1.38,-1.62],["MET","MetLife Inc.","Financials",48.2,1.4,1.14,8.0,4.61,10.5,-1.9,2,2,1.21,-0.64],["MHK","Mohawk Industries","Consumer Discretionary",189.4,3.5,1.49,13.0,2.59,73.1,-4.0,2,2,-0.18,0.88],["MJN","Mead Johnson","Consumer Staples",78.9,12.1,1.72,103.0,3.28,24.1,6.5,2,2,-0.21,0.72],["MKC","McCormick & Co.","Consumer Staples",85.6,7.0,1.03,24.0,3.14,27.2,-2.0,2,2,0.22,0.05],["MLM","Martin Marietta Materials","Materials",136.6,-10.9,2.16,7.0,4.31,31.7,3.1,2,2,-0.79,0.53],["MMC","Marsh & McLennan","Financials",55.5,6.0,1.03,25.0,3.01,18.4,-2.0,2,2,0.5,-0.19],["MMM","3M Company","Industrials",150.6,5.9,0.98,42.0,7.72,19.5,2.0,2,2,1.41,0.12],["MNST","Monster Beverage","Consumer Staples",49.7,10.8,1.59,11.0,3.71,25.4,-5.2,4,2,0.85,1.42],["MO","Altria Group Inc","Consumer Staples",58.2,6.9,0.96,182.0,2.67,21.8,-6.6,2,2,0.83,-1.48],["MOS","The Mosaic Company","Materials",27.6,-11.2,2.83,10.0,2.79,9.9,5.8,2,2,-1.34,-0.42],["MPC","Marathon Petroleum","Energy",51.8,11.5,1.99,22.0,5.29,9.8,5.8,2,2,0.25,-0.23],["MRK","Merck & Co.","Health Care",52.8,7.0,1.28,10.0,1.58,33.4,-4.3,2,2,1.18,-1.29],["MRO","Marathon Oil Corp.","Energy",12.6,-20.3,3.33,12.0,-3.26,93.1,1.3,0,2,-3.13,-0.1],["MTB","M&T Bank Corp.","Financials",121.2,-0.4,1.38,7.0,7.22,16.8,-0.9,2,2,0.46,0.5],["MTD","Mettler Toledo","Health Care",339.1,18.9,1.12,61.0,12.75,26.6,4.4,2,2,1.51,2.22],["MUR","Murphy Oil","Energy",22.5,-8.6,2.85,43.0,-13.03,28.4,-1.3,0,2,-3.22,-0.73],["MYL","Mylan N.V.","Health Care",54.1,33.2,2.3,9.0,1.58,33.4,-4.2,2,2,0.23,-0.21],["NAVI","Navient","Financials",11.4,1.9,2.23,25.0,2.66,4.3,-1.9,2,2,-0.61,-0.4],["NBL","Noble Energy Inc","Energy",32.9,7.3,2.51,24.0,-6.07,93.1,1.2,0,2,-2.21,0.45],["NDAQ","NASDAQ OMX Group","Financials",58.2,8.8,1.56,8.0,2.56,22.7,-11.7,2,2,-0.04,0.02],["NEE","NextEra Energy","Utilities",103.9,6.2,1.02,12.0,6.11,17.0,-7.4,2,2,0.94,-0.3],["NEM","Newmont Mining Corp.","Materials",18.0,10.8,2.54,2.0,0.43,41.8,7.0,2,2,-0.85,0.66],["NFLX","Netflix Inc.","Information Technology",114.4,11.1,2.61,6.0,0.29,394.4,-5.7,0,0,-2.56,3.49],["NFX","Newfield Exploration Co","Energy",32.6,-3.3,2.42,244.0,-21.18,93.1,-0.1,0,2,-4.47,-0.35],["NLSN","Nielsen Holdings","Industrials",46.6,4.9,1.2,13.0,1.55,30.1,-12.4,2,2,-0.03,-0.55],["NOV","National Oilwell Varco Inc.","Energy",33.5,-12.6,1.95,5.0,-1.99,93.1,9.6,0,2,-1.7,0.24],["NSC","Norfolk Southern Corp.","Industrials",84.6,9.5,2.17,13.0,5.13,16.5,0.9,2,2,-0.08,0.21],["NTRS","Northern Trust Corp.","Financials",72.1,5.8,1.28,11.0,4.03,17.9,-13.4,2,2,0.35,-0.03],["NUE","Nucor Corp.","Materials",40.3,6.6,1.46,5.0,1.11,36.3,11.2,2,2,-0.13,0.65],["NWL","Newell Brands","Consumer Discretionary",44.1,10.0,1.64,19.0,1.3,33.9,-2.1,2,2,-0.35,-0.14],["O","Realty Income Corporation","Real Estate",51.6,8.4,1.1,4.0,1.09,47.4,-4.0,2,2,0.0,0.04],["OKE","ONEOK","Energy",24.7,-24.1,3.56,73.0,1.17,21.1,-8.0,0,2,-2.73,-0.96],["OMC","Omnicom Group","Consumer Discretionary",75.7,14.8,1.07,45.0,4.43,17.1,-10.5,2,2,0.56,-0.22],["ORLY","O'Reilly Automotive","Consumer Discretionary",253.4,1.0,1.09,47.0,9.32,27.2,-0.4,2,2,0.81,1.09],["OXY","Occidental Petroleum","Energy",67.6,0.9,1.59,32.0,-10.23,93.1,3.3,0,2,-2.58,0.61],["PBCT","People's United Financial","Financials",16.1,3.1,1.13,5.0,0.86,18.8,-0.4,2,2,-0.04,-0.26],["PBI","Pitney-Bowes","Industrials",20.6,3.8,1.26,228.0,2.04,10.1,-0.7,2,2,-0.74,-0.62],["PCAR","PACCAR Inc.","Industrials",47.4,-9.3,1.44,23.0,4.52,10.5,6.3,2,2,-0.02,-0.09],["PCG","PG&E Corp.","Utilities",53.2,0.5,1.04,5.0,1.81,29.4,-1.1,2,2,0.11,-0.43],["PCLN","Priceline.com Inc","Consumer Discretionary",1274.9,3.2,1.27,29.0,50.09,25.5,-1.1,1,4,6.17,8.76],["PEG","Public Serv. Enterprise","Utilities",38.7,-8.2,1.18,13.0,3.32,11.7,-0.4,2,2,0.06,-0.78],["PEP","PepsiCo Inc.","Consumer Staples",99.9,6.1,0.81,45.0,3.71,26.9,-5.2,2,2,1.48,-0.47],["PFE","Pfizer Inc.","Health Care",32.3,3.1,1.24,11.0,1.13,28.6,-4.2,3,2,2.26,-3.15],["PFG","Principal Financial Group","Financials",45.0,-5.3,1.53,13.0,4.11,10.9,-4.5,2,2,-0.05,-0.21],["PG","Procter & Gamble","Consumer Staples",79.4,10.7,0.81,17.0,3.28,24.1,-2.3,2,2,0.74,0.3],["PGR","Progressive Corp.","Financials",31.8,3.5,1.09,17.0,2.16,14.7,-0.8,2,2,0.32,-0.34],["PHM","Pulte Homes Inc.","Consumer Discretionary",17.8,-5.6,1.69,10.0,1.38,12.9,-0.3,2,2,-0.62,-0.71],["PM","Philip Morris International","Consumer Staples",87.9,10.3,0.86,52.0,4.42,19.9,-1.4,2,2,1.73,-0.8],["PNC","PNC Financial Services","Financials",95.3,7.0,1.12,9.0,7.52,12.7,-0.7,2,2,1.29,0.04],["PNR","Pentair Ltd.","Industrials",49.5,-3.0,1.88,2.0,-0.42,14.6,-6.6,2,2,-0.89,-0.57],["PNW","Pinnacle West Capital","Utilities",64.5,0.5,1.14,10.0,3.94,16.4,-6.1,2,2,0.1,-0.36],["PPG","PPG Industries","Materials",98.8,19.2,1.53,28.0,5.18,19.1,-0.6,2,2,0.54,0.36],["PPL","PPL Corp.","Utilities",34.1,3.4,1.11,7.0,1.01,33.8,-2.8,2,2,0.03,-0.57],["PRU","Prudential Financial","Financials",81.4,6.6,1.23,13.0,12.37,6.6,-4.2,2,2,1.81,0.15],["PSX","Phillips 66","Energy",81.8,5.4,1.38,18.0,7.78,10.5,7.0,2,2,0.98,-0.2],["PWR","Quanta Services Inc.","Industrials",20.2,-16.6,2.95,10.0,1.59,12.7,4.3,0,2,-1.84,-0.6],["PX","Praxair Inc.","Materials",102.4,0.3,1.13,35.0,5.39,19.0,0.6,2,2,0.39,-0.05],["PYPL","PayPal","Information Technology",36.2,17.5,1.93,9.0,1.0,36.2,5.4,2,2,-0.04,-0.32],["R","Ryder System","Industrials",56.8,-23.2,1.95,15.0,5.75,9.9,-12.0,2,2,-0.93,-0.84],["RCL","Royal Caribbean Cruises Ltd","Consumer Discretionary",101.2,13.4,1.56,8.0,3.03,33.4,-15.7,2,2,0.08,-0.08],["REGN","Regeneron","Health Care",542.9,17.0,1.8,17.0,6.17,88.0,20.4,1,2,0.87,4.58],["RHI","Robert Half International","Industrials",47.1,-7.7,1.14,36.0,2.72,17.3,4.1,2,2,-0.27,-0.26],["ROP","Roper Industries","Industrials",189.8,20.4,1.06,13.0,6.92,27.4,-16.2,2,2,1.14,0.98],["RRC","Range Resources Corp.","Energy",24.6,-25.1,3.71,26.0,-4.29,93.1,0.5,0,2,-3.61,-0.19],["RSG","Republic Services Inc","Industrials",44.0,6.7,0.84,10.0,2.14,20.6,-2.4,2,2,0.37,-0.45],["SCG","SCANA Corp","Utilities",60.5,7.2,1.27,14.0,5.22,11.6,-4.0,2,2,0.32,-0.23],["SCHW","Charles Schwab Corporation","Financials",32.9,15.5,1.46,11.0,1.04,31.7,-0.1,2,2,0.43,-0.31],["SE","Spectra Energy Corp.","Energy",23.9,-9.9,2.03,3.0,0.29,82.6,-2.6,2,2,-1.31,-0.36],["SEE","Sealed Air","Materials",44.6,-5.1,1.58,43.0,1.63,27.4,-2.7,2,2,-0.72,-0.37],["SHW","Sherwin-Williams","Materials",259.6,16.5,1.43,121.0,11.38,22.8,2.8,2,2,0.91,1.49],["SLG","SL Green Realty","Real Estate",113.0,4.0,1.09,4.0,1.02,110.8,-3.1,2,2,-0.28,0.88],["SNI","Scripps Networks Interactive","Consumer Discretionary",55.2,12.2,1.77,40.0,4.68,11.8,-8.0,2,2,-0.09,-0.26],["SO","Southern Co.","Utilities",46.8,4.4,0.9,11.0,2.6,18.0,-2.8,2,2,0.72,-0.75],["SPG","Simon Property Group Inc","Real Estate",194.4,5.3,1.14,48.0,5.88,33.1,-1.3,2,2,0.74,0.73],["SPGI","S&P Global, Inc.","Financials",98.6,14.0,1.08,596.0,4.26,23.1,-4.2,2,2,-1.16,-0.22],["SRCL","Stericycle Inc","Industrials",120.6,-13.9,1.2,10.0,3.02,39.9,-18.9,2,2,-0.39,-0.36],["SRE","Sempra Energy","Utilities",94.0,-2.8,1.13,11.0,5.43,17.3,-8.5,2,2,0.35,-0.36],["STI","SunTrust Banks","Financials",42.8,12.0,1.44,8.0,3.62,11.8,-2.5,2,2,0.46,-0.34],["STT","State Street Corp.","Financials",66.4,-0.9,1.44,9.0,4.53,14.6,-4.0,2,2,0.29,-0.16],["SWKS","Skyworks Solutions","Information Technology",76.8,-8.5,2.02,25.0,4.21,18.2,7.4,2,2,-0.47,0.76],["SWN","Southwestern Energy","Energy",7.1,-44.8,4.58,200.0,-6.07,93.1,1.3,0,2,-5.84,-0.54],["SYF","Synchrony Financial","Financials",30.4,-2.9,1.84,18.0,2.66,11.4,-0.8,2,2,-0.13,-0.55],["SYK","Stryker Corp.","Health Care",92.9,-1.7,1.14,17.0,3.82,24.3,7.0,2,2,0.38,0.51],["T","AT&T Inc","Telecommunications Services",34.4,5.9,0.86,11.0,2.37,14.5,-23.5,3,2,3.31,-4.38],["TAP","Molson Coors Brewing Company","Consumer Staples",93.9,13.1,1.22,5.0,1.94,48.4,-25.4,2,2,0.12,-0.18],["TDC","Teradata Corp.","Information Technology",26.4,-8.8,2.73,25.0,-1.53,74.6,4.1,0,2,-2.07,0.31],["TGNA","Tegna, Inc.","Consumer Discretionary",25.5,13.6,1.8,21.0,2.04,12.5,-12.7,2,2,-0.27,-0.59],["TMK","Torchmark Corp.","Financials",57.2,1.2,1.02,13.0,4.21,13.6,-1.9,2,2,0.32,0.03],["TMO","Thermo Fisher Scientific","Health Care",141.9,15.6,1.25,9.0,4.96,28.6,-28.0,2,2,0.79,-0.34],["TRIP","TripAdvisor","Consumer Discretionary",85.2,34.8,1.58,14.0,1.38,61.8,2.6,2,2,0.37,1.64],["TRV","The Travelers Companies","Financials",112.9,13.0,0.96,15.0,10.99,10.3,-0.9,2,2,1.7,0.46],["TSCO","Tractor Supply Company","Consumer Discretionary",85.5,1.3,1.43,29.0,3.03,28.2,6.0,2,2,-0.22,0.19],["TSN","Tyson Foods","Consumer Staples",53.3,23.2,1.59,13.0,3.28,24.1,-2.0,2,2,0.33,0.1],["TSO","Tesoro Petroleum Co.","Energy",105.4,8.6,1.85,30.0,12.5,8.4,4.6,2,2,0.66,0.54],["TSS","Total System Services","Information Technology",49.8,9.2,1.58,20.0,1.98,25.2,-2.3,2,2,-0.15,0.22],["TXN","Texas Instruments","Information Technology",54.8,10.0,1.26,30.0,2.86,19.2,2.8,2,2,0.74,-0.18],["UAA","Under Armour","Consumer Discretionary",80.6,-16.9,1.76,14.0,3.03,20.8,-0.9,2,2,-0.81,-0.32],["UAL","United Continental Holdings","Industrials",57.3,8.2,1.75,82.0,19.52,2.9,-23.2,2,2,1.86,-0.75],["UDR","UDR Inc","Real Estate",37.6,8.6,1.16,12.0,1.3,28.9,-3.1,2,2,0.02,-0.18],["UHS","Universal Health Services","Health Care",119.5,-5.1,2.05,16.0,6.89,17.3,6.3,2,2,-0.35,0.35],["UNH","United Health Group Inc.","Health Care",117.6,1.5,1.48,17.0,6.1,19.3,-8.8,2,2,1.14,-0.23],["UNM","Unum Group","Financials",33.3,3.8,1.1,10.0,3.51,9.5,-4.2,2,2,0.34,-0.19],["UNP","Union Pacific","Industrials",78.2,-12.4,1.43,23.0,5.51,14.2,1.1,2,2,0.51,-0.73],["UPS","United Parcel Service","Industrials",96.2,-2.8,0.83,196.0,5.38,17.9,1.1,2,2,0.66,-0.57],["UTX","United Technologies","Industrials",96.1,8.1,0.95,28.0,8.72,11.0,-13.2,2,2,1.99,-0.75],["VAR","Varian Medical Systems","Health Care",80.8,9.2,1.03,24.0,4.13,19.6,9.5,2,2,0.42,0.51],["VLO","Valero Energy","Energy",70.7,17.3,1.63,19.0,8.0,8.8,15.3,2,2,1.1,0.4],["VMC","Vulcan Materials","Materials",95.0,6.0,1.85,5.0,1.66,57.2,-0.3,2,2,-0.52,0.69],["VNO","Vornado Realty Trust","Real Estate",100.0,10.0,1.02,11.0,3.61,27.7,-1.1,2,2,0.51,0.35],["VRSK","Verisk Analytics","Industrials",76.9,-1.4,1.45,37.0,3.07,25.0,-13.6,2,2,-0.32,-0.45],["VRSN","Verisign Inc.","Information Technology",87.4,23.5,1.38,35.0,3.29,26.6,4.1,2,2,0.44,0.92],["VRTX","Vertex Pharmaceuticals Inc","Health Care",125.8,21.9,2.46,59.0,-2.31,39.6,2.6,2,2,-0.87,1.45],["VTR","Ventas Inc","Real Estate",56.4,0.2,1.44,4.0,1.26,44.8,-4.0,2,2,-0.37,-0.1],["VZ","Verizon Communications","Telecommunications Services",46.2,6.3,0.84,109.0,4.38,10.6,-26.4,3,2,3.36,-4.21],["WAT","Waters Corporation","Health Care",134.6,13.9,1.04,23.0,5.7,23.6,29.5,4,2,1.09,2.83],["WEC","Wec Energy Group Inc","Utilities",51.3,-2.0,1.1,7.0,2.36,21.7,-1.9,2,2,-0.02,-0.45],["WFC","Wells Fargo","Financials",54.4,5.5,0.97,12.0,4.18,13.0,-0.9,3,2,4.75,-3.67],["WHR","Whirlpool Corp.","Consumer Discretionary",146.9,-0.2,2.4,17.0,9.95,14.8,-45.1,2,2,-0.22,-0.65],["WM","Waste Management Inc.","Industrials",53.4,7.1,0.94,14.0,1.66,32.2,-1.4,2,2,0.22,-0.4],["WMB","Williams Cos.","Energy",25.7,-31.0,3.72,9.0,-0.76,93.1,-14.6,0,2,-3.26,-0.82],["WU","Western Union Co","Information Technology",17.9,-2.6,1.27,60.0,1.63,11.0,-8.0,2,2,-0.3,-1.05],["WY","Weyerhaeuser Corp.","Real Estate",30.0,8.5,1.34,10.0,0.89,33.7,2.3,2,2,-0.01,0.03],["WYN","Wyndham Worldwide","Consumer Discretionary",72.7,1.0,1.33,64.0,5.18,14.0,-10.2,2,2,-0.05,-0.41],["WYNN","Wynn Resorts Ltd","Consumer Discretionary",69.2,29.5,3.79,174.0,1.93,35.8,12.7,0,2,-1.75,1.52],["XEC","Cimarex Energy","Energy",89.4,-14.4,2.4,86.0,-25.92,93.1,7.2,0,2,-4.18,0.65],["XEL","Xcel Energy Inc","Utilities",35.9,1.4,1.02,9.0,1.94,18.5,-2.3,2,2,0.17,-0.67],["XL","XL Capital","Financials",39.2,7.7,0.99,10.0,4.22,9.3,-7.8,2,2,0.63,-0.23],["XOM","Exxon Mobil Corp.","Energy",77.9,3.7,1.37,9.0,3.85,20.2,-2.7,3,2,3.11,-2.9],["XRAY","Dentsply Sirona","Health Care",60.8,19.9,1.01,11.0,1.79,34.0,0.9,2,2,0.43,0.4],["XRX","Xerox Corp.","Information Technology",10.6,9.5,1.87,5.0,0.42,25.3,-0.3,2,2,-0.32,-0.71],["XYL","Xylem Inc.","Industrials",36.5,11.0,1.17,16.0,1.88,19.4,4.1,2,2,0.17,0.14],["YHOO","Yahoo Inc.","Information Technology",33.3,14.9,1.85,15.0,-4.64,29.0,6.3,4,2,-0.86,1.45],["YUM","Yum! Brands Inc","Consumer Discretionary",52.5,-8.7,1.48,142.0,2.97,17.7,-3.8,2,2,-0.65,-0.69],["ZBH","Zimmer Biomet Holdings","Health Care",102.6,9.3,1.4,1.0,0.78,131.5,-23.9,2,2,-0.51,0.82],["ZION","Zions Bancorp","Financials",27.3,-1.2,1.47,4.0,1.2,22.7,-0.1,2,2,-0.35,-0.15],["ZTS","Zoetis","Health Care",47.9,16.7,1.61,32.0,0.68,70.5,1.7,2,2,-0.32,0.47]],"kp":[{"n":"Distressed Value","r":"High Risk","sz":28,"p":39,"ch":-13.8,"v":2.94,"pe":88.7},{"n":"Premium Growth","r":"Medium Risk","sz":8,"p":536,"ch":9.6,"v":1.57,"pe":139.0},{"n":"Mainstream Core","r":"Medium Risk","sz":282,"p":73,"ch":5.4,"v":1.4,"pe":24.0},{"n":"Defensive Income","r":"Low Risk","sz":9,"p":47,"ch":5.2,"v":1.08,"pe":15.6},{"n":"Cash-Rich Growth","r":"Medium Risk","sz":13,"p":75,"ch":9.0,"v":1.54,"pe":44.7}],"hp":[{"n":"Ultra-Premium Outlier","sz":3,"p":327,"ch":21.9,"co":["Alexion Pharmaceutic","Amazon.com Inc","Netflix Inc."]},{"n":"High-Growth Tech","sz":2,"p":26,"ch":11.2,"co":["Bank of America Corp","Intel Corp."]},{"n":"Mainstream Universe","sz":330,"p":75,"ch":3.9,"co":["American Airlines Gr","AbbVie","Abbott Laboratories"]},{"n":"Individual Special Case","sz":1,"p":105,"ch":16.2,"co":["Facebook"]},{"n":"Individual Special Case","sz":1,"p":1275,"ch":3.2,"co":["Priceline.com Inc"]},{"n":"Individual Special Case","sz":1,"p":277,"ch":6.2,"co":["Alliance Data System"]},{"n":"Individual Special Case","sz":1,"p":4,"ch":-38.1,"co":["Chesapeake Energy"]},{"n":"Individual Special Case","sz":1,"p":44,"ch":11.4,"co":["Apache Corporation"]}],"sectors":["Consumer Discretionary","Consumer Staples","Energy","Financials","Health Care","Industrials","Information Technology","Materials","Real Estate","Telecommunications Services","Utilities"],"pca":[22.8,14.4]};

const KM_COLORS = ["#ef4444","#a855f7","#3b82f6","#22c55e","#f59e0b"];
const HC_COLORS = ["#06b6d4","#f43f5e","#3b82f6","#84cc16","#f59e0b","#8b5cf6","#ec4899","#14b8a6"];
const SECTOR_SHORT = {"Consumer Discretionary":"Cons.Disc","Consumer Staples":"Cons.Stpl","Energy":"Energy","Financials":"Finance","Health Care":"Health","Industrials":"Industry","Information Technology":"InfoTech","Materials":"Material","Real Estate":"RealEst","Telecommunications Services":"Telecom","Utilities":"Utility"};

const stocks = D.s.map(s => ({
  ticker:s[0], name:s[1], sector:s[2], price:s[3], change:s[4], vol:s[5],
  roe:s[6], eps:s[7], pe:s[8], pb:s[9], km:s[10], hc:s[11], x:s[12], y:s[13]
}));

export default function App() {
  const [method, setMethod] = useState("km");
  const [selCluster, setSelCluster] = useState(null);
  const [selSector, setSelSector] = useState("All");
  const [hovStock, setHovStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const profiles = method === "km" ? D.kp : D.hp;
  const colors = method === "km" ? KM_COLORS : HC_COLORS;

  const filtered = useMemo(() => {
    let f = stocks;
    if (selSector !== "All") f = f.filter(s => s.sector === selSector);
    if (selCluster !== null) f = f.filter(s => (method === "km" ? s.km : s.hc) === selCluster);
    if (searchTerm) f = f.filter(s => s.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return f;
  }, [selSector, selCluster, method, searchTerm]);

  const xRange = useMemo(() => {
    const xs = stocks.map(s => s.x);
    const ys = stocks.map(s => s.y);
    return { xMin: Math.min(...xs)-0.5, xMax: Math.max(...xs)+0.5, yMin: Math.min(...ys)-0.5, yMax: Math.max(...ys)+0.5 };
  }, []);

  const toSVG = useCallback((x, y) => {
    const px = ((x - xRange.xMin) / (xRange.xMax - xRange.xMin)) * 580 + 10;
    const py = ((xRange.yMax - y) / (xRange.yMax - xRange.yMin)) * 360 + 10;
    return { px, py };
  }, [xRange]);

  const silKM = 0.467;
  const silHC = 0.618;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", background: "#0a0f1a", color: "#e2e8f0", minHeight: "100vh", padding: "0" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)", borderBottom: "1px solid rgba(99,102,241,0.2)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#818cf8", textTransform: "uppercase", marginBottom: 4 }}>Unsupervised Learning Project</div>
              <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, background: "linear-gradient(90deg, #e2e8f0, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Trade & Ahead — Stock Clustering Analysis
              </h1>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: "4px 0 0" }}>340 NYSE Companies · 11 Financial Indicators · K-Means & Hierarchical Clustering</p>
            </div>
            <div style={{ display: "flex", gap: 4, background: "#1e293b", borderRadius: 8, padding: 3 }}>
              {[["km","K-Means (k=5)"],["hc","Hierarchical (k=8)"]].map(([k,label]) => (
                <button key={k} onClick={() => { setMethod(k); setSelCluster(null); }}
                  style={{ padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit",
                    background: method === k ? "linear-gradient(135deg, #4f46e5, #7c3aed)" : "transparent",
                    color: method === k ? "#fff" : "#94a3b8", transition: "all 0.2s"
                  }}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px" }}>
        {/* Metrics Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 16 }}>
          {[
            ["Companies", "340", "#3b82f6"],
            ["Clusters", method === "km" ? "5" : "8", "#8b5cf6"],
            ["Silhouette", method === "km" ? silKM.toFixed(3) : silHC.toFixed(3), method === "km" ? "#f59e0b" : "#22c55e"],
            ["PCA Var.", `${D.pca[0]+D.pca[1]}%`, "#06b6d4"],
            ["Method", method === "km" ? "Euclidean" : "Avg Linkage", "#ec4899"],
          ].map(([label, val, color]) => (
            <div key={label} style={{ background: "#111827", borderRadius: 8, padding: "12px 14px", border: `1px solid ${color}22` }}>
              <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color, fontFamily: "'JetBrains Mono', monospace" }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
          {/* Left: Scatter Plot */}
          <div>
            <div style={{ background: "#111827", borderRadius: 10, padding: 16, border: "1px solid #1e293b" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>PCA Projection</span>
                  <span style={{ fontSize: 11, color: "#64748b", marginLeft: 8 }}>PC1 ({D.pca[0]}%) vs PC2 ({D.pca[1]}%)</span>
                </div>
                <select value={selSector} onChange={e => setSelSector(e.target.value)}
                  style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, padding: "4px 8px", color: "#e2e8f0", fontSize: 11, fontFamily: "inherit" }}>
                  <option value="All">All Sectors</option>
                  {D.sectors.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <svg viewBox="0 0 600 380" style={{ width: "100%", background: "#0a0f1a", borderRadius: 8 }}>
                {stocks.map((s, i) => {
                  const cl = method === "km" ? s.km : s.hc;
                  const {px, py} = toSVG(s.x, s.y);
                  const isFiltered = (selSector !== "All" && s.sector !== selSector) || (selCluster !== null && cl !== selCluster);
                  const isHov = hovStock === i;
                  return (
                    <circle key={i} cx={px} cy={py} r={isHov ? 6 : 3.5}
                      fill={isFiltered ? "#1e293b" : colors[cl % colors.length]}
                      opacity={isFiltered ? 0.15 : (isHov ? 1 : 0.75)}
                      stroke={isHov ? "#fff" : "none"} strokeWidth={1.5}
                      style={{ cursor: "pointer", transition: "all 0.15s" }}
                      onMouseEnter={() => setHovStock(i)}
                      onMouseLeave={() => setHovStock(null)}
                    />
                  );
                })}
                {hovStock !== null && (() => {
                  const s = stocks[hovStock];
                  const {px, py} = toSVG(s.x, s.y);
                  const tipX = px > 400 ? px - 155 : px + 12;
                  const tipY = py > 300 ? py - 70 : py + 5;
                  return (
                    <g>
                      <rect x={tipX} y={tipY} width={150} height={64} rx={6} fill="#1e293b" stroke="#475569" strokeWidth={0.5} />
                      <text x={tipX+8} y={tipY+16} fill="#e2e8f0" fontSize={11} fontWeight="bold" fontFamily="DM Sans">{s.ticker}</text>
                      <text x={tipX+8} y={tipY+30} fill="#94a3b8" fontSize={9} fontFamily="DM Sans">{s.name}</text>
                      <text x={tipX+8} y={tipY+44} fill="#22c55e" fontSize={10} fontFamily="JetBrains Mono">${s.price}</text>
                      <text x={tipX+70} y={tipY+44} fill={s.change >= 0 ? "#22c55e" : "#ef4444"} fontSize={10} fontFamily="JetBrains Mono">{s.change >= 0 ? "+" : ""}{s.change}%</text>
                      <text x={tipX+8} y={tipY+57} fill="#64748b" fontSize={8.5} fontFamily="DM Sans">{SECTOR_SHORT[s.sector] || s.sector} · Vol: {s.vol}</text>
                    </g>
                  );
                })()}
              </svg>
              {/* Legend */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                {profiles.map((p, i) => (
                  <button key={i} onClick={() => setSelCluster(selCluster === i ? null : i)}
                    style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 4,
                      background: selCluster === i ? `${colors[i]}22` : "transparent",
                      border: selCluster === i ? `1px solid ${colors[i]}` : "1px solid transparent",
                      cursor: "pointer", fontSize: 10, color: colors[i], fontFamily: "inherit" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: colors[i], display: "inline-block" }} />
                    {p.n} ({p.sz})
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Table */}
            <div style={{ background: "#111827", borderRadius: 10, padding: 16, marginTop: 12, border: "1px solid #1e293b" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{filtered.length} Stocks {selCluster !== null ? `in ${profiles[selCluster]?.n || "Cluster "+selCluster}` : ""}</span>
                <input placeholder="Search ticker..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, padding: "5px 10px", color: "#e2e8f0", fontSize: 11, width: 140, fontFamily: "inherit" }} />
              </div>
              <div style={{ maxHeight: 220, overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1e293b" }}>
                      {["Ticker","Company","Sector","Price","13W Chg","Vol","P/E"].map(h => (
                        <th key={h} style={{ padding: "6px 8px", textAlign: "left", color: "#64748b", fontWeight: 500, fontSize: 10, position: "sticky", top: 0, background: "#111827" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.slice(0, 50).map((s, i) => {
                      const cl = method === "km" ? s.km : s.hc;
                      return (
                        <tr key={s.ticker} style={{ borderBottom: "1px solid #1e293b11" }}
                          onMouseEnter={() => setHovStock(stocks.indexOf(s))}
                          onMouseLeave={() => setHovStock(null)}>
                          <td style={{ padding: "5px 8px" }}>
                            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: colors[cl % colors.length], marginRight: 6 }} />
                            <span style={{ fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{s.ticker}</span>
                          </td>
                          <td style={{ padding: "5px 8px", color: "#94a3b8", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name}</td>
                          <td style={{ padding: "5px 8px", color: "#64748b", fontSize: 10 }}>{SECTOR_SHORT[s.sector]}</td>
                          <td style={{ padding: "5px 8px", fontFamily: "'JetBrains Mono', monospace" }}>${s.price}</td>
                          <td style={{ padding: "5px 8px", fontFamily: "'JetBrains Mono', monospace", color: s.change >= 0 ? "#22c55e" : "#ef4444" }}>{s.change >= 0 ? "+" : ""}{s.change}%</td>
                          <td style={{ padding: "5px 8px", fontFamily: "'JetBrains Mono', monospace", color: s.vol > 2 ? "#f59e0b" : "#94a3b8" }}>{s.vol}</td>
                          <td style={{ padding: "5px 8px", fontFamily: "'JetBrains Mono', monospace" }}>{s.pe.toFixed(1)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filtered.length > 50 && <div style={{ padding: 8, textAlign: "center", color: "#64748b", fontSize: 10 }}>Showing 50 of {filtered.length} stocks</div>}
              </div>
            </div>
          </div>

          {/* Right: Cluster Profiles */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
              {method === "km" ? "Investment Strategy Profiles" : "Risk-Based Cluster Profiles"}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {profiles.map((p, i) => (
                <button key={i} onClick={() => setSelCluster(selCluster === i ? null : i)}
                  style={{ background: selCluster === i ? `${colors[i]}11` : "#111827", borderRadius: 10, padding: 14, textAlign: "left",
                    border: selCluster === i ? `1.5px solid ${colors[i]}` : "1px solid #1e293b",
                    cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: colors[i] }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{p.n}</span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: colors[i], fontFamily: "'JetBrains Mono', monospace" }}>{p.sz}</span>
                  </div>
                  {method === "km" ? (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 12px", fontSize: 10 }}>
                      <div><span style={{ color: "#64748b" }}>Avg Price: </span><span style={{ color: "#e2e8f0", fontFamily: "'JetBrains Mono', monospace" }}>${p.p}</span></div>
                      <div><span style={{ color: "#64748b" }}>13W Return: </span><span style={{ color: p.ch >= 0 ? "#22c55e" : "#ef4444", fontFamily: "'JetBrains Mono', monospace" }}>{p.ch > 0 ? "+" : ""}{p.ch}%</span></div>
                      <div><span style={{ color: "#64748b" }}>Volatility: </span><span style={{ color: p.v > 2 ? "#f59e0b" : "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>{p.v}</span></div>
                      <div><span style={{ color: "#64748b" }}>P/E Ratio: </span><span style={{ color: "#e2e8f0", fontFamily: "'JetBrains Mono', monospace" }}>{p.pe}</span></div>
                      <div style={{ gridColumn: "span 2" }}>
                        <span style={{ display: "inline-block", padding: "1px 6px", borderRadius: 3, fontSize: 9, fontWeight: 600,
                          background: p.r === "High Risk" ? "#ef444422" : p.r === "Low Risk" ? "#22c55e22" : "#f59e0b22",
                          color: p.r === "High Risk" ? "#ef4444" : p.r === "Low Risk" ? "#22c55e" : "#f59e0b"
                        }}>{p.r}</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 10 }}>
                      <div><span style={{ color: "#64748b" }}>Avg Price: </span><span style={{ fontFamily: "'JetBrains Mono', monospace" }}>${p.p}</span>
                        <span style={{ color: "#64748b", marginLeft: 10 }}>Return: </span><span style={{ color: p.ch >= 0 ? "#22c55e" : "#ef4444", fontFamily: "'JetBrains Mono', monospace" }}>{p.ch > 0 ? "+" : ""}{p.ch}%</span></div>
                      {p.co && <div style={{ color: "#64748b", marginTop: 3, fontSize: 9 }}>{p.co.join(", ")}</div>}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Method Comparison */}
            <div style={{ background: "#111827", borderRadius: 10, padding: 14, marginTop: 12, border: "1px solid #1e293b" }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Method Comparison</div>
              <div style={{ fontSize: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                {[["Silhouette Score", silKM.toFixed(3), silHC.toFixed(3)], ["Clusters", "5", "8"], ["Balance Ratio", "0.028", "0.003"], ["Execution", "0.0095s", "0.0049s"]].map(([label, km, hc]) => (
                  <div key={label}>
                    <div style={{ color: "#64748b", marginBottom: 3 }}>{label}</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <div style={{ flex: 1, background: method === "km" ? "#4f46e522" : "#1e293b", borderRadius: 4, padding: "4px 8px", border: method === "km" ? "1px solid #4f46e544" : "1px solid transparent" }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#818cf8" }}>{km}</span>
                        <span style={{ color: "#475569", marginLeft: 4 }}>KM</span>
                      </div>
                      <div style={{ flex: 1, background: method === "hc" ? "#06b6d422" : "#1e293b", borderRadius: 4, padding: "4px 8px", border: method === "hc" ? "1px solid #06b6d444" : "1px solid transparent" }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22d3ee" }}>{hc}</span>
                        <span style={{ color: "#475569", marginLeft: 4 }}>HC</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div style={{ marginTop: 12, padding: "10px 14px", background: "#111827", borderRadius: 10, border: "1px solid #1e293b", fontSize: 10, color: "#64748b", lineHeight: 1.5 }}>
              <strong style={{ color: "#94a3b8" }}>About this project:</strong> Dual-clustering framework for Trade & Ahead portfolio optimization. K-Means provides tactical allocation across 5 investment strategies. Hierarchical clustering serves as automated outlier detection, separating the 97% mainstream market from 3% exceptional cases.
              <div style={{ marginTop: 6, color: "#475569" }}>UT Austin DSBA · Alan McGirr · Unsupervised Learning</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
