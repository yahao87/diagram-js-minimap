/* global sinon */

import {
  remove as domRemove
} from 'min-dom';

import {
  bootstrapDiagram,
  inject,
  insertCSS
} from '../TestHelper';

import minimapModule from '../../';

import moveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import zoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import modelingModule from 'diagram-js/lib/features/modeling';
import moveModule from 'diagram-js/lib/features/move';

import minimapCSS from '../../assets/diagram-js-minimap.css';

insertCSS('diagram-js-minimap.css', minimapCSS);


describe('minimap', function() {

  describe('in modeler', function() {

    beforeEach(bootstrapDiagram({
      modules: [
        minimapModule,
        moveCanvasModule,
        zoomScrollModule,
        modelingModule,
        moveModule
      ]
    }));


    it('should show', inject(function(canvas, modeling, elementFactory) {

      var shapeA = elementFactory.createShape({
        id: 'A',
        width: 100,
        height: 300
      });

      modeling.createShape(shapeA, { x: 100, y: 300 }, canvas.getRootElement());


      var shapeB = elementFactory.createShape({
        id: 'B',
        width: 50,
        height: 50
      });

      modeling.createShape(shapeB, { x: 800, y: 1200 }, canvas.getRootElement());


      var shapeC = elementFactory.createShape({
        id: 'C',
        width: 300,
        height: 300
      });

      modeling.createShape(shapeC, { x: 800, y: 100 }, canvas.getRootElement());
    }));

  });


  describe('in viewer', function() {

    beforeEach(bootstrapDiagram({
      modules: [
        minimapModule,
        moveCanvasModule,
        zoomScrollModule
      ],
      minimap: {
        open: true
      }
    }));


    it('should show', inject(function(canvas, elementFactory) {

      var shapeA = elementFactory.createShape({
        id: 'A',
        width: 100,
        height: 300,
        x: 50,
        y: 150
      });

      canvas.addShape(shapeA, canvas.getRootElement());


      var shapeB = elementFactory.createShape({
        id: 'B',
        width: 50,
        height: 50,
        x: 775,
        y: 1175
      });

      canvas.addShape(shapeB, canvas.getRootElement());


      var shapeC = elementFactory.createShape({
        id: 'C',
        width: 300,
        height: 300,
        x: 650,
        y: -50
      });

      canvas.addShape(shapeC, canvas.getRootElement());
    }));

  });

  describe('canvas.resized', function() {

    beforeEach(bootstrapDiagram({
      modules: [
        minimapModule,
        moveCanvasModule,
        zoomScrollModule
      ],
      minimap: {
        open: true
      }
    }));


    it('should not update if not present in DOM', inject(function(canvas, eventBus, minimap) {

      // given
      var spy = sinon.spy(minimap, '_update');

      // when
      domRemove(canvas.getContainer());

      eventBus.fire('canvas.resized');

      // then
      expect(spy).to.not.have.been.called;
    }));
  });

});