export const latexTemplate = String.raw`
%-------------------------
% Resume in Latex
% Author : Abey George
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage[english]{babel}
\usepackage{tabularx}
\usepackage{fontawesome5}
\usepackage{multicol}
\usepackage{graphicx}
\setlength{\multicolsep}{-3.0pt}
\setlength{\columnsep}{-1pt}
\input{glyphtounicode}

\RequirePackage{tikz}
\RequirePackage{xcolor}
\RequirePackage{fontawesome}
\usepackage{tikz}
\usetikzlibrary{svg.path}


\definecolor{cvblue}{HTML}{0E5484}
\definecolor{black}{HTML}{130810}
\definecolor{darkcolor}{HTML}{0F4539}
\definecolor{cvgreen}{HTML}{3BD80D}
\definecolor{taggreen}{HTML}{00E278}
\definecolor{SlateGrey}{HTML}{2E2E2E}
\definecolor{LightGrey}{HTML}{666666}
\colorlet{name}{black}
\colorlet{tagline}{darkcolor}
\colorlet{heading}{darkcolor}
\colorlet{headingrule}{cvblue}
\colorlet{accent}{darkcolor}
\colorlet{emphasis}{SlateGrey}
\colorlet{body}{LightGrey}



%----------FONT OPTIONS----------
% sans-serif
% \usepackage[sfdefault]{FiraSans}
% \usepackage[sfdefault]{roboto}
% \usepackage[sfdefault]{noto-sans}
% \usepackage[default]{sourcesanspro}

% serif
% \usepackage{CormorantGaramond}
% \usepackage{charter}


% \pagestyle{fancy}
% \fancyhf{}  % clear all header and footer fields
% \fancyfoot{}
% \renewcommand{\headrulewidth}{0pt}
% \renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.6in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1.19in}
\addtolength{\topmargin}{-.7in}
\addtolength{\textheight}{1.4in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large\bfseries
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\pdfgentounicode=1

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\classesList}[4]{
    \item\small{
        {#1 #2 #3 #4 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{\large#1} & \textbf{\small #2} \\
      \textit{\large#3} & \textit{\small #4} \\
      
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}


\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{1.001\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & \textbf{\small #2}\\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemi{$\vcenter{\hbox{\tiny$\bullet$}}$}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}


\newcommand\sbullet[1][.5]{\mathbin{\vcenter{\hbox{\scalebox{#1}{$\bullet$}}}}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\begin{document}

%----------HEADING----------


\begin{center}
    {\Huge \scshape {{name}}} \\ \vspace{1pt}
    {{location}}\\ \vspace{1pt}
    \small \href{tel:{{phone}}}{\raisebox{-0.1\height}{\faPhone}\ \underline{{phone}}} ~ \href{mailto: {{email}}}{\raisebox{-0.2\height}{\faEnvelope}\ \underline{{email}}} ~
    \href{https://{{linkedin}}}{\raisebox{-0.2\height}\faLinkedinSquare\ \underline{{linkedin}}}  ~
    \href{https://{{github}}}{\raisebox{-0.2\height}\faGithub\ \underline{{github}}} ~
    \href{https://{{portfolio}}}{\raisebox{-0.2\height}\faPoll\ \underline{{portfolio}}}
    
\end{center}

\vspace{-12pt}
%-----------EDUCATION-----------
\section{EDUCATION}
  \resumeSubHeadingListStart
    {{education_items}}
  \resumeSubHeadingListEnd
\vspace{-12pt}
%-----------EXPERIENCE-----------
\section{PROFESSIONAL EXPERIENCE}
    \resumeSubHeadingListStart
        {{experience_items}}
    \resumeSubHeadingListEnd

\vspace{-15pt}

%-----------PROGRAMMING SKILLS-----------
\section{TECHNICAL SKILLS}
\vspace{-2pt}
\begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
     \textbf{\normalsize{Languages:}}{ \normalsize{{{skills_languages}}}} \\
     \textbf{\normalsize{Developer Tools:}}{ \normalsize{{{skills_tools}}}} \\
     \textbf{\normalsize{Technologies/Frameworks:}}{\normalsize{ {{skills_frameworks}}}} \\
    }}
\end{itemize}

\vspace{-15pt}

%-----------PROJECTS-----------
\section{SELECTED PROJECTS}
\vspace{-2pt}
\resumeSubHeadingListStart
{{project_items}}
\resumeSubHeadingListEnd

\vspace{5pt}

%------RELEVANT COURSEWORK---
----
\section{COURSEWORK}
\vspace{-2pt}
    %\resumeSubHeadingListStart
        \begin{multicols}{3}
            \begin{itemize}[itemsep=-2pt, parsep=5pt]
                {{coursework_items}}
            \end{itemize}
        \end{multicols}
        \vspace*{2.0\multicolsep}
    %\resumeSubHeadingListEnd


%-----------INVOLVEMENT---------------%\section{ACHIEVEMENTS/EXTRACURRICULAR}
\section{ACHIEVEMENTS/EXTRACURRICULAR}
\vspace{-2pt}
\begin{itemize}
  {{achievement_items}}
\end{itemize}
\vspace{-15pt}


 
 %-----------CERTIFICATIONS---------------
\section{CERTIFICATIONS}
\vspace{-2pt}
\begin{itemize}
    {{certification_items}}
\end{itemize}
\end{document}

`;
