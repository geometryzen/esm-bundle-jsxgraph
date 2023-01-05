// The jsxgraph@1.5.0-rc1 does not actually export granular objects.
export * from 'jsxgraph';

import JXG from 'jsxgraph';
export default JXG;

// The following "Hack" is used to restore granular objects.
// This is consistent with 1.4.x.

// Values
export const COORDS_BY_SCREEN = JXG.COORDS_BY_SCREEN;
export const COORDS_BY_USER = JXG.COORDS_BY_USER;
export const Dump = JXG.Dump;
export const JSXGraph = JXG.JSXGraph;
export const Math = JXG.Math;
export const Options = JXG.Options;
export const boards = JXG.boards;
export const elements = JXG.elements;
export const palette = JXG.palette;
export const paletteWong = JXG.paletteWong;

// Classes
export const Board = JXG.Board;
export const Chart = JXG.Chart;
export const Circle = JXG.Circle;
export const Complex = JXG.Complex;
export const Composition = JXG.Composition;
export const Coords = JXG.Coords;
export const CoordsElement = JXG.CoordsElement;
export const Curve = JXG.Curve;
export const GeometryElement = JXG.GeometryElement;
export const Group = JXG.Group;
export const Image = JXG.Image;
export const JessieCode = JXG.JessieCode;
export const Line = JXG.Line;
export const Point = JXG.Point;
export const Polygon = JXG.Polygon;
export const Text = JXG.Text;
export const Ticks = JXG.Ticks;
export const Transformation = JXG.Transformation;
export const Turtle = JXG.Turtle;
export const View3D = JXG.View3D;

// Functions
export const LMS2rgb = JXG.LMS2rgb;
export const addEvent = JXG.addEvent;
export const autoDigits = JXG.autoDigits;
export const autoHighlight = JXG.autoHighlight;
export const bind = JXG.bind;
export const capitalize = JXG.capitalize;
export const clearVisPropOld = JXG.clearVisPropOld;
export const clone = JXG.clone;
export const cloneAndCopy = JXG.cloneAndCopy;
export const cmpArrays = JXG.cmpArrays;
export const coordsArrayToMatrix = JXG.coordsArrayToMatrix;
export const copyAttributes = JXG.copyAttributes;
export const createEvalFunction = JXG.createEvalFunction;
export const createFunction = JXG.createFunction;
export const createHTMLSlider = JXG.createHTMLSlider;
export const debug = JXG.debug;
export const debugInt = JXG.debugInt;
export const debugLine = JXG.debugLine;
export const debugWST = JXG.debugWST;
// etc...